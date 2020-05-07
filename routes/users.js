import express from 'express';
import Joi from '@hapi/joi';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser } from '../util/helpers';

const router = express.Router();

router.post('', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await signUp.validateAsync({ username, email, password });

    const newUser = new User({ username, email, password });

    const sessionUser = sessionizeUser(newUser);

    await newUser.save();

    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    console.log(err);

    if (Joi.isError(err)) {
      err.isJoi = true;
      if (err._original.password) {
        delete err._original.password;
      }
    }

    res.status(400).send(parseError(err));
  }
});

export default router;
