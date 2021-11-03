const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  NEW: 'NEW',
  DELETED: 'DELETED',
};
const FINANCE_TYPE = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
};
const TRANSACTION_TYPE = {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
};
const DEFAULT_PAGINATION = {
  LIMIT: 20,
  OFFSET: 0,
};

const DEFAULT_SORT = {
  COLUMN: 'created_at',
  ORDER: '-1',
};
module.exports = {
  USER_STATUS,
  FINANCE_TYPE,
  DEFAULT_PAGINATION,
  DEFAULT_SORT,
  TRANSACTION_TYPE,
};
