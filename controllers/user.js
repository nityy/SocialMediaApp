const Users = require('../models/user');
const Posts = require('../models/post');

signin = async (req, res) => {

}

signup = async (req, res) => {

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