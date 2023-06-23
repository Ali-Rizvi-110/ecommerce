const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: 55
  },
  lastName: {
    type: String,
    required: [true, 'must provide lastname'],
    trim: true,
    maxlength: 55
  },
  contact: {
    type: Number,
    required: [true, 'must provide contact number'],
    trim: true,
    maxlength: 30
  },
  email: {
    type: String,
    required: [true, 'must provide email'],
    trim: true,
    maxlength: 80
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
    maxlength: 120
  },
  wishlist: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      _id: false
    }
  ],
  cart: [
    {
      count: { type: Number, default: 0 },
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      _id: false
    }
  ]
});

module.exports = mongoose.model('User', userSchema, 'users');
