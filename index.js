const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 1234;
const app = express();
const passport = require('passport');
const movies = require('./routes/movies');
const users = require('./routes/users');
const db = require('./config/keys').mongoURI;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', movies);
app.use('/api/users', users);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use('/api/users', users);

app.listen(port, () => console.log(`> App listening on port ${port}`));
