const {
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
  FINANCE_TYPE,
  TRANSACTION_TYPE,
} = require('../common');
const Asset = require('../models/AssetModel');
const Joi = require('joi');

module.exports.addAsset = async (req, res, next) => {
  const { body, userData } = req;
  const schema = Joi.object().keys({
    amount: Joi.number().integer().min(1).required(),
    what_buy: Joi.string().alphanum().min(3).max(50).required(),
    how_buy: Joi.string().alphanum().min(3).max(50).required(),
    image_url: Joi.array().items(Joi.string()),
    account_detail: Joi.object().required(),
    description: Joi.string().min(3).max(500).required(),
    transaction_type: Joi.valid(
      TRANSACTION_TYPE.ASSET,
      TRANSACTION_TYPE.LIABILITY,
    ).required(),
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
    body.user = userData.userId;
    Asset.create(body)
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
module.exports.getAsset = async (req, res, next) => {
  const { pageNumber, pageSize, sortBy, sortOrder } = req.query;
  var whereClause = {
    user: req.userData.userId,
  };
  if (
    req.query.transaction_type !== '' &&
    req.query.transaction_type !== undefined
  ) {
    whereClause = {
      user: req.userData.userId,
      transaction_type: req.query.transaction_type,
    };
  }
  const limit = pageSize || DEFAULT_PAGINATION.LIMIT;
  const offset = pageNumber ? limit * pageNumber : DEFAULT_PAGINATION.OFFSET;
  const orderColumn = sortBy || DEFAULT_SORT.COLUMN;
  const orderType = sortOrder || DEFAULT_SORT.ORDER;

  const financeData = await Asset.find(whereClause)
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
  const totalCount = await Asset.count(whereClause).exec();
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
module.exports.updateAsset = (req, res, next) => {
  const { params, body } = req;
  var whereClause = {
    _id: params.id,
  };

  Asset.findOne(whereClause)
    .exec()
    .then((assetData) => {
      if (!assetData) {
        res.status(404).json({
          message: 'record not found',
          statusCode: 404,
          data: null,
          error: null,
        });
      } else {
        assetData
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
