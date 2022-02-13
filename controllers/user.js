const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const Posts = require('../models/post');

signin = async (req, res) => {
  try {
    const username = req.body.username;
    const existUser = await Users.findOne({ username: username });
    if (existUser) {
      const passCorrect = await bcrypt.compare(req.body.password, existUser.passwordHash);
      if (passCorrect) {
        token = jwt.sign({ username: username, id = existUser._id }, process.env.SECRET,
          { expiresIn: "24h" });
        res.status(200).json({ message: 'Logged in successfully', existUser, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    } else {
      res.send(400).json({ message: 'User doesn\'t exists!' });
    }
  } catch (error) {

  }
}

signup = async (req, res) => {
  try {
    const username = req.body.username;
    const existUser = await Users.findOne({ username: username });
    if (existUser) {
      res.status(422).json({ message: 'Username already exists!' });
    } else {
      const hash = await bcrypt.hash(req.body.password, 14);
      const user = await Users.create({
        username: username,
        passwordHash: hash
      });
      token = jwt.sign({ username: username, id: user._id }, process.env.SECRET,
        { expiresIn: "24h" })
      res.status(201).json({ message: 'Signed up successfully!', user, token: token });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

toggleFollow = async (req, res) => {

}

fetchPostsByUser = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageLimit = 10;
  try {
    const user = req.params.username;
    const totalPosts = await Posts.where('creator').equals(user);
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

module.exports = {
  signin, signup, toggleFollow, fetchPostsByUser
};