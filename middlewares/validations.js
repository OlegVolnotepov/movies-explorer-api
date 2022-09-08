const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../utils/errors/BadRequestError');

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().custom((value) => {
        if (!validator.isURL(value, { require_protocol: true })) {
          throw new BadRequestError('Неправильный формат URL адреса');
        }
        return value;
      }),
    }),
});

const updateUserdValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatardValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
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
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
  }),
});

module.exports = {
  cardIdValidation,
  createCardValidation,
  userIdValidation,
  loginValidation,
  registerValidation,
  updateUserdValidation,
  updateAvatardValidation,
};
