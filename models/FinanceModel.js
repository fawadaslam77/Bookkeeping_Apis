const mongoose = require('mongoose');
const Enum = require('../common');
const financeSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 15,
    },
    payment_mode: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    finance_type: {
      type: String,
      required: true,
      enum: Enum.FINANCE_TYPE,
    },
    description: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 500,
    },
    image_url: [
      {
        type: String,
        minlength: 6,
        maxlength: 30,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('finance', financeSchema);
