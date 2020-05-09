import Joi from '@hapi/joi';

const id = Joi.number().required();

const title = Joi.string().required();

const poster_path = Joi.string().required();

const runtime = Joi.number().required();

const release_date = Joi.string().required();

export const watchList = Joi.object().keys({
  id,
  title,
  poster_path,
  runtime,
  release_date,
});
