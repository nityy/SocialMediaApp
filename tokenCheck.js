const jwt = require('jsonwebtoken');

const tokenCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.SECRET);
    req.username = payload.username;
    req.userId = payload.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalid or expired!' });
  }
}

module.exports = tokenCheck;