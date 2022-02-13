const express = require('express');
const { getFeed, newPost, fetchPost, updatePost,
  deletePost, fetchComments, newComment, deleteComment,
  toggleLike } = require('../controllers/post');
const tokenCheck = require('../tokenCheck');

router = express.Router();

router.route('/')
  .get(tokenCheck, getFeed)
  .post(tokenCheck, newPost);

router.route('/:postId')
  .get(fetchPost)
  .put(tokenCheck, updatePost)
  .delete(tokenCheck, deletePost);

router.route('/:postId/comments')
  .get(fetchComments)
  .post(tokenCheck, newComment);

router.route('/:postId/comments/:commentId')
  .delete(tokenCheck, deleteComment);

router.patch('/:postId/likes', tokenCheck, toggleLike);

module.exports = router;