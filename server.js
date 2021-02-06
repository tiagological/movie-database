import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectStore from 'connect-mongo';
import dotenv from 'dotenv';
import path from 'path';
import {
  movieRoutes,
  userRoutes,
  sessionRoutes,
  watchListRoutes
} from './routes';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME
} = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('> MongoDB successfully connected'))
  .catch((err) => console.log(err));

const app = express();
const MongoStore = connectStore(session);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
}

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', 1);
app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: parseInt(SESS_LIFETIME) / 1000
    }),
    cookie: {
      sameSite: true,
      secure: NODE_ENV === 'production',
      maxAge: parseInt(SESS_LIFETIME)
    }
  })
);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/watchlist', watchListRoutes);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(PORT, () => console.log(`> App listening on port ${PORT}`));
