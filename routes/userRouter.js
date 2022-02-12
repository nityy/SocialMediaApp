const express = require('express');
const { signin, signup, toggleFollow, fetchPostsByUser }
  = require('../controllers/user');

router = express.Router();

router.post('signup', signup);
router.post('signin', signin);
router.post('follows', toggleFollow);
router.get('/:username/posts', fetchPostsByUser);

module.exports = router;