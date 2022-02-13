const Posts = require('../models/post');
const Users = require('../models/user');

getFeed = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageLimit = 10;
  try {
    const user = await Users.where('username').equals(req.username);
    const follows = user.follows;
    const totalPosts = await Posts.where('creator').in(follows);
    const posts = await totalPosts.sort({ _id: 'desc' })
      .skip((page - 1) * pageLimit).limit(pageLimit);
    res.status(200).json({
      data: {
        posts: posts,
        currentPage: page,
        totalPages: Math.ceil(totalPosts / pageLimit)
      }
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

newPost = async (req, res) => {
  try {
    const post = req.body;
    req.user = req.user;
    const reply = await Posts.create({ ...post, creator: req.userId });
    res.status(201).json({ data: reply });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

fetchPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reply = await Posts.findById(postId);
    res.status(200).json({ data: reply });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

updatePost = async (req, res) => { // TODO: creator check
  try {
    const postId = req.params.postId;
    const update = req.body;
    const reply = await Posts.findByIdAndUpdate(postId, update,
      { new: true });
    res.status(200).json({ data: reply });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

deletePost = async (req, res) => { // TODO: creator check
  try {
    const postId = req.params.postId;
    await Posts.findByIdAndDelete(postId);
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

fetchComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Posts.findById(postId);
    const reply = post.comments;
    res.status(200).json({ data: reply });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

newComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comment = req.body;
    const post = await Posts.findById(postId);
    post.comments.push({ ...comment, creator: req.userId });
    const reply = await post.save();
    res.status(201).json({ data: reply });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

deleteComment = async (req, res) => { // TODO: creator check
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const post = await Posts.findById(postId);
    post.comments.id(commentId).remove();
    await post.save();
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

toggleLike = async (req, res) => {
  try {

  } catch (error) {

  }
}

module.exports = {
  getFeed, newPost, fetchPost, updatePost,
  deletePost, fetchComments, newComment, deleteComment,
  toggleLike
};