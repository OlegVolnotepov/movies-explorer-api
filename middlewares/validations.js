const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../utils/errors/BadRequestError');

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Неправильный формат URL адреса');
        }
        return value;
      }),
      trailerLink: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Неправильный формат URL адреса');
        }
        return value;
      }),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Неправильный формат URL адреса');
        }
        return value;
      }),
      movieId: Joi.number().required(),
    }),
});

const updateUserdValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(30),
  }),
});

const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(30),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  movieIdValidation,
  createMovieValidation,
  loginValidation,
  registerValidation,
  updateUserdValidation,
};
