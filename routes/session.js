import express from 'express';
import User from '../models/user';
import Joi from '@hapi/joi';
import { signIn } from '../validations/user';
import { parseError, sessionizeUser } from '../util/helpers';

const { SESS_NAME } = process.env;

const router = express.Router();

router.post('', async (req, res) => {
  try {
    const { email, password } = req.body;

    await signIn.validateAsync({ email, password });

    const user = await User.findOne({ email });

    if (user && user.comparePasswords(password)) {
      const sessionUser = sessionizeUser(user);

      req.session.user = sessionUser;
      res.send(sessionUser);
    } else {
      throw new Error('Invalid login credentials');
    }
  } catch (err) {
    if (Joi.isError(err)) {
      err.isJoi = true;
    }
    res.status(401).send(parseError(err));
  }
});

router.delete('', ({ session }, res) => {
  try {
    const user = session.user;

    if (user) {
      session.destroy((err) => {
        if (err) {
          throw err;
        }

        res.clearCookie(SESS_NAME);
        res.send(user);
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).send(parseError(err));
  }
});

router.get('', ({ session: { user } }, res) => {
  res.send({ user });
});

export default router;
