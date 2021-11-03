const mongoose = require('mongoose');
const Enum = require('../common');
const userSchema = mongoose.Schema(
  {
    mobile_number: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 15,
    },
    full_name: {
      type: String,
      minlength: 6,
      maxlength: 30,
    },
    shop_name: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    location: {
      type: String,
      minlength: 6,
      maxlength: 30,
    },
    share_detail: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      default: false,
    },
    status: {
      type: String,
      enum: Enum.USER_STATUS,
      default: Enum.USER_STATUS.NEW,
    },
    team_members: [
      {
        mobile_number: {
          type: String,
          required: false,
          minlength: 6,
          maxlength: 15,
        },
        full_access: {
          type: Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('User', userSchema);
