const express = require('express');
const user = require('../controllers/user');
const tokenCheck = require('../tokenCheck');

const router = express.Router();

router.get('/:username', user.userProfile);
router.post('/:username/follows', tokenCheck, user.toggleFollow);
router.get('/:username/posts', user.fetchPostsByUser);

module.exports = router;