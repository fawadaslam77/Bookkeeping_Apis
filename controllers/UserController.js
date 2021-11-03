var Enum = require('../common');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('../config');
const fs = require('fs');
const AWS = require('aws-sdk');
const { buffer } = require('buffer');

module.exports.sendOTP = async (req, res, next) => {
  const { body } = req;
  const schema = Joi.object().keys({
    mobile_number: Joi.number().required(),
  });
  const result = schema.validate(body);
  const { value, error } = result;
  const valid = error == null;

  if (valid) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const accountSid = config.twilio.sid;
    const authToken = config.twilio.token;
    const from = config.twilio.from;
    const client = require('twilio')(accountSid, authToken);
    await client.messages
      .create({
        body: 'Your OTP :' + otp,
        from: from,
        to: req.body.mobile_number,
      })
      .then((message) =>
        User.findOne({ mobile_number: req.body.mobile_number })
          .exec()
          .then((users) => {
            if (users == null || users == '') {
              const user = new User({
                mobile_number: req.body.mobile_number,
                otp: otp,
              });
              User.create(user).then((result) => {
                res.status(200).json({
                  message: 'OTP send successfully!',
                  statusCode: 200,
                  data: null,
                  error: null,
                });
              });
            } else {
              users.otp = otp;
              users.save().then((result) => {
                res.status(200).json({
                  message: 'OTP send successfully!',
                  statusCode: 200,
                  data: null,
                  error: null,
                });
              });
            }
          }),
      );
  } else {
    res.status(200).json({
      message: 'some thing went wrong',
      statusCode: 500,
      data: null,
      error: error,
    });
  }
};
module.exports.verification = (req, res, next) => {
  -User.findOne({ mobile_number: req.body.mobile_number })
    .exec()
    .then((result) => {
      if (result != null && result.otp == req.body.otp) {
        const token = jwt.sign(
          { mobile_number: result.mobile_numnber, userId: result._id },
          config.privateKey,
          { expiresIn: '365d' },
        );
        res.status(200).json({
          message: 'success',
          statusCode: 200,
          data: result,
          error: null,
          token: token,
        });
      } else {
        res.status(404).json({
          message: 'Can not match this code',
          statusCode: 404,
          data: null,
          error: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: 'some thing went wrong',
        statusCode: 500,
        data: null,
        error: err,
      });
    });
};

module.exports.basicInfo = (req, res, next) => {
  var condition = { _id: req.userData.userId };
  const basinInfo = {
    full_name: req.body.full_name,
    shop_name: req.body.shop_name,
    location: req.body.location,
    share_detail: req.body.share_detail,
    status: Enum.USER_STATUS.ACTIVE,
    team_members: req.body.team_members,
  };
  User.updateOne(condition, basinInfo)
    .exec()
    .then((result) => {
      User.findById(req.userData.userId)
        .exec()
        .then((user) => {
          res.status(200).json({
            message: 'update successfully',
            statusCode: 200,
            data: user,
            error: null,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'some thing went wrong',
        statusCode: 500,
        data: null,
        error: err,
      });
    });
};
module.exports.uploadImage = (req, res, next) => {
  const s3 = new AWS.S3({
    accessKeyId: 'AKIA6BLHPY3RKQBTN3NA',
    secretAccessKey: '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',
  });
  //var buf = new Buffer.from(req.body.base64, 'base64');
  //console.log(buf);
  const fileName = 'abc.jpg';
  var file = req.files.file;
  console.log({ file });
  fs.readFile(file.path, function (err, data) {
    if (err) throw err;
    var d = new Date();
    const name = d.getTime().toString();
    const params = {
      Bucket: 'hisab-kitab', // pass your bucket name
      Key: 'images/' + name + '.jpg', //file.name doesn't exist as a property
      Body: data,
      SourceFile: file.path,
      ContentType: file.type, //<-- this is what you need!
      ACL: 'public-read', //<-- this makes it public so people can see it
      // ContentDisposition: 'inline; filename=' + name + '.jpg',
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;

      console.log(`File uploaded successfully at ${data.Location}`);
      res.status(200).json({
        message: 'success',
        statusCode: 200,
        data: data.Location,
        error: null,
      });
    });
  });
};
