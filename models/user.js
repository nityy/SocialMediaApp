const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  follows: {
    type: [{ type: mongoose.ObjectId, ref: 'User' }],
    default: []
  }
});


module.exports = mongoose.model('User', userSchema);