const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  follows: {
    type: [{ type: mongoose.ObjectId, ref: 'User' }],
    default: []
  },
  followers: {
    type: [{ type: mongoose.ObjectId, ref: 'User' }],
    default: []
  }
});


const User = mongoose.model('User', userSchema);
module.exports = User;