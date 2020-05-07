import express from 'express';
const mongoose = require('mongoose');
import session from 'express-session';
import connectStore from 'connect-mongo';
const dotenv = require('dotenv');
import {
  PORT,
  NODE_ENV,
  MONGO_URI,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
} from './config';
import { movieRoutes, userRoutes, sessionRoutes } from './routes';

dotenv.config();

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('> MongoDB successfully connected'))
  .catch((err) => console.log(err));

const app = express();
const MongoStore = connectStore(session);

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session',
      ttl: parseInt(SESS_LIFETIME) / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: NODE_ENV === 'production',
      maxAge: parseInt(SESS_LIFETIME),
    },
  })
);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRoutes);

app.listen(PORT, () => console.log(`> App listening on port ${PORT}`));
