import Joi from '@hapi/joi';

const email = Joi.string().email().required();

const username = Joi.string().alphanum().min(6).max(30).required();

const message =
  'Password must be between 6-16 characters, ' +
  'have at least one capital letter, ' +
  'one lowercase letter, one digit, ' +
  'and one special character';

const password = Joi.string()
  .pattern(
    new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    )
  )
  .message(message);

export const signUp = Joi.object().keys({
  email,
  username,
  password,
});

export const signIn = Joi.object().keys({
  email,
  password,
});
