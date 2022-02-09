const express = require('express');
router = express.Router();

router.get('/user', fetchPostsByUser);

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

exports = router;