const express = require('express');
const { signin, signup, toggleFollow, fetchPostsByUser }
  = require('../controllers/user');
const tokenCheck = require('../tokenCheck');

router = express.Router();

router.post('signup', signup);
router.post('signin', signin);
router.patch('/:username/follows', tokenCheck, toggleFollow);
router.get('/:username/posts', fetchPostsByUser);

module.exports = router;