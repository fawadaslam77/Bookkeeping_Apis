const { DEFAULT_PAGINATION, DEFAULT_SORT, FINANCE_TYPE } = require('../common');
const Finance = require('../models/FinanceModel');
const Joi = require('joi');

module.exports.addFinance = async (req, res, next) => {
  const { body, userData } = req;
  const schema = Joi.object().keys({
    amount: Joi.number().integer().min(1).required(),
    payment_mode: Joi.string().alphanum().min(3).max(50).required(),
    description: Joi.string().min(3).max(500),
    image_url: Joi.array().items(Joi.string().min(3).max(50)),
    finance_type: Joi.valid(
      FINANCE_TYPE.EXPENSE,
      FINANCE_TYPE.INCOME,
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
    Finance.create(body)
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
module.exports.getFinance = async (req, res, next) => {
  const { pageNumber, pageSize, sortBy, sortOrder } = req.query;
  var whereClause = {
    user: req.userData.userId,
  };
  if (req.query.finance_type !== '' && req.query.finance_type !== undefined) {
    whereClause = {
      user: req.userData.userId,
      finance_type: req.query.finance_type,
    };
  }
  const limit = pageSize || DEFAULT_PAGINATION.LIMIT;
  const offset = pageNumber ? limit * pageNumber : DEFAULT_PAGINATION.OFFSET;
  const orderColumn = sortBy || DEFAULT_SORT.COLUMN;
  const orderType = sortOrder || DEFAULT_SORT.ORDER;

  const financeData = await Finance.find(whereClause)
    .sort({ orderColumn: orderType })
    .limit(limit)
    .exec()
    .catch((err) => {
      res.status(500).json({
        message: 'something went wronge',
        statusCode: 200,
        error: err,
      });
    });
  const totalCount = await Finance.count(whereClause).exec();
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
module.exports.updateFinance = (req, res, next) => {
  const { params, body } = req;
  var whereClause = {
    _id: params.id,
  };

  Finance.findOne(whereClause)
    .exec()
    .then((fianceData) => {
      if (!fianceData) {
        res.status(404).json({
          message: 'record not found',
          statusCode: 404,
          data: null,
          error: null,
        });
      } else {
        fianceData
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
