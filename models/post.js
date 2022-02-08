const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  creator: {
    type: ObjectId, ref: User
  },
  likedBy: {
    type: [{ type: ObjectId, ref: 'User' }],
    default: []
  },
  comments: {
    type: [commentSchema]
  },
});

const commentSchema = new Schema({
  content: { type: String },
  creator: {
    type: ObjectId, ref: User
  }
});

const Posts = mongoose.model('Post', postSchema);
exports = Posts