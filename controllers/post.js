const Posts = require('../models/post');
const mongoose = require('mongoose');

fetchPostsByUser = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageLimit = 10;
  try {
    const user = req.param.userId;
    const totalPosts = await Posts.find().where('username').equals(user);
    const Posts = await totalPosts.sort({ _id: 'desc' })
      .skip((page - 1) * pageLimit).limit(pageLimit);
    res.status(200).json({
      posts: Posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / pageLimit)
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

getFeed = async (req, res) => {

}

newPost = async (req, res) => {
  const newPost = req.body;
  try {
    reply = await Posts.create({ ...newPost, creator: req.user });
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

fetchPost = async (req, res) => {
  try {
    const postId = req.param.postId;
    const reply = await Posts.findById(postId);
    res.json(reply);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

updatePost = async (req, res) => {
  try {
    const postId = req.param.postId;
    const updatedPost = req.body;
    const reply = await Posts.findByIdAndUpdate(postId, updatedPost,
      { new: true });
    res.send(200).json(reply);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
}

deletePost = async (req, res) => {
  try {
    const postId = req.param.postId;
    const reply = await Posts.findByIdAndDelete(postId);
    res.status(204).json(reply);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  fetchPostsByUser, getFeed, newPost, fetchPost, updatePost,
  deletePost, fetchComments, newComment, updateComment, deleteComment,
  toggleLike
};