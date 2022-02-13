const express = require('express');
const { signin, signup, toggleFollow, fetchPostsByUser }
  = require('../controllers/user');
const tokenCheck = require('../tokenCheck');

router = express.Router();

router.post('signup', signup);
router.post('signin', signin);
router.post('follows', tokenCheck, toggleFollow);
router.get('/:username/posts', fetchPostsByUser);

module.exports = router;