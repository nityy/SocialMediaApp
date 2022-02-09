const express = require('express');
const { fetchPostsByUser, getFeed, newPost, fetchPost, updatePost,
  deletePost, fetchComments, newComment, updateComment, deleteComment,
  toggleLike } = require('../controllers/post');

router = express.Router();

router.get('/byUser/:username', fetchPostsByUser);

router.route('/')
  .get(getFeed)
  .post('/', newPost);

router.route('/:postId')
  .get(fetchPost)
  .put(updatePost)
  .delete(deletePost);

router.route('/:postId/comments')
  .get(fetchComments)
  .post(newComment);

router.route('/:postId/comments/:commentId')
  .put(updateComment)
  .delete(deleteComment);

router.patch('/:postId/likes', toggleLike);

module.exports = router;