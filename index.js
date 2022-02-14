const mongoose = require('mongoose');
const express = require('express');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const newUser = require('./controllers/user');
require('dotenv').config();

const dburl = process.env.MONGO_URL;
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postRouter);
app.use('/user', userRouter);
app.post('/signup', newUser.signup);
app.post('/signin', newUser.signin);

mongoose.connect(dburl)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    });
  })
  .catch((err) => console.log(err));