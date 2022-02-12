const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  content: { type: String, required: true },
  creator: { type: mongoose.ObjectId, ref: 'User', required: true }
});

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.ObjectId, ref: 'User', required: true },
  likedBy: {
    type: [{ type: mongoose.ObjectId, ref: 'User' }],
    default: []
  },
  comments: { type: [commentSchema], default: [] },
});

module.exports = mongoose.model('Post', postSchema);