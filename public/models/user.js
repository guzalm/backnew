const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    //required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    //required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  shoppingCart: [{
    productName: String,
    quantity: Number
    // Add any other fields you need for your shopping cart items
  }]
}, { collection: 'users' });

const User = mongoose.model('User', UserSchema);

module.exports = User;
