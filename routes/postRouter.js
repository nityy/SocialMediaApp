const express = require('express');
const { getFeed, newPost, fetchPost, updatePost,
  deletePost, fetchComments, newComment, deleteComment,
  toggleLike } = require('../controllers/post');

router = express.Router();

router.route('/')
  .get(getFeed)
  .post(newPost);

router.route('/:postId')
  .get(fetchPost)
  .put(updatePost)
  .delete(deletePost);

router.route('/:postId/comments')
  .get(fetchComments)
  .post(newComment);

router.route('/:postId/comments/:commentId')
  .delete(deleteComment);

router.patch('/:postId/likes', toggleLike);

module.exports = router;