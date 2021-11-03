const mongoose = require('mongoose');
const Enum = require('../common');
const transferSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      minlength: 1,
      maxlength: 15,
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    image_url: [
      {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 30,
      },
    ],
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 500,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('transfer', transferSchema);
