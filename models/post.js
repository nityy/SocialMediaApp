const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  creator: {
    type: ObjectId, ref: User
  },
  likedBy: {
    type: [{ type: mongoose.ObjectId, ref: 'User' }],
    default: []
  },
  comments: [commentSchema],
});

const commentSchema = new Schema({
  content: { type: String },
  creator: {
    type: mongoose.ObjectId, ref: User
  }
});

const Posts = mongoose.model('Post', postSchema);
exports = Posts