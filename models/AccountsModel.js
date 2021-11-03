const mongoose = require('mongoose');
const accountSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    number: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

module.exports = mongoose.model('Account', accountSchema);
