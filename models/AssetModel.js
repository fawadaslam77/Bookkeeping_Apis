const mongoose = require('mongoose');
const Enum = require('../common');
const assetSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 15,
    },
    what_buy: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    how_buy: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    image_url: [
      {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 30,
      },
    ],
    account_detail: {
      number: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    transaction_type: {
      type: String,
      required: true,
      enum: Enum.TRANSACTION_TYPE,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('asset', assetSchema);
