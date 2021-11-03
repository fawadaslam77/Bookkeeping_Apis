const {
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
  FINANCE_TYPE,
  TRANSACTION_TYPE,
} = require('../common');
const Transfer = require('../models/TransferModel');
const Accout = require('../models/AccountsModel');
const Joi = require('joi');

module.exports.addTransfer = async (req, res, next) => {
  const { body, userData } = req;
  const schema = Joi.object().keys({
    amount: Joi.number().integer().min(1).required(),
    from: Joi.object().required(),
    to: Joi.object().required(),
    image_url: Joi.array().items(Joi.string()),
    description: Joi.string().min(3).max(500).required(),
  });
  const result = schema.validate(body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: error,
    });
  } else {
    const fromData = {
      type: body.from.type,
      name: body.from.name,
      number: body.from.number,
      user: userData.userId,
    };
    const toData = {
      type: body.to.type,
      name: body.to.name,
      number: body.to.number,
      user: userData.userId,
    };

    const accountFrom = await Accout.create(fromData);
    const accountTo = await Accout.create(toData);

    body.user = userData.userId;
    body.to = accountTo._id;
    body.from = accountFrom._id;
    Transfer.create(body)
      .then((result) => {
        res.status(200).json({
          message: 'successfully inserted',
          statusCode: 200,
          data: body,
          error: null,
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
  }
};
module.exports.getTransfer = async (req, res, next) => {
  const { pageNumber, pageSize, sortBy, sortOrder } = req.query;
  var whereClause = {
    user: req.userData.userId,
  };

  const limit = pageSize || DEFAULT_PAGINATION.LIMIT;
  const offset = pageNumber ? limit * pageNumber : DEFAULT_PAGINATION.OFFSET;
  const orderColumn = sortBy || DEFAULT_SORT.COLUMN;
  const orderType = sortOrder || DEFAULT_SORT.ORDER;

  const financeData = await Transfer.find(whereClause)
    .sort({ orderColumn: orderType })
    .limit(limit)
    .exec()
    .catch((err) => {
      res.status(200).json({
        message: 'Success',
        statusCode: 200,
        error: null,
      });
    });
  const totalCount = await Transfer.count(whereClause).exec();
  res.status(200).json({
    message: 'Success',
    statusCode: 200,
    data: {
      totalCount,
      results: financeData,
    },
    error: null,
  });
};
module.exports.getAccounts = async (req, res, next) => {
  const accountList = await Accout.find().exec();
  res.status(200).json({
    message: 'record  found',
    statusCode: 200,
    data: accountList,
    error: null,
  });
};
module.exports.updateTransfer = (req, res, next) => {
  const { params, body, userData } = req;
  var whereClause = {
    _id: params.id,
  };

  Transfer.findOne(whereClause)
    .exec()
    .then(async (transferData) => {
      if (!transferData) {
        res.status(404).json({
          message: 'record not found',
          statusCode: 404,
          data: null,
          error: null,
        });
      } else {
        if (body.to_id) {
          body.to = body.to_id;
        } else {
          const toData = {
            type: body.to.type,
            name: body.to.name,
            number: body.to.number,
            user: userData.userId,
          };
          const accountTo = await Accout.create(toData);
          body.to = accountTo._id;
        }

        if (body.from_id) {
          body.from = body.from_id;
        } else {
          const fromData = {
            type: body.from.type,
            name: body.from.name,
            number: body.from.number,
            user: userData.userId,
          };

          const accountFrom = await Accout.create(fromData);
          body.from = accountFrom._id;
        }
        transferData
          .update(body)
          .exec()
          .then((result) => {
            res.status(200).json({
              message: 'record updated successfully!',
              statusCode: 200,
              data: body,
              error: null,
            });
          });
      }
    });
};
