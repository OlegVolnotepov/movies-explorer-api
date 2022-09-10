const express = require('express');

const routes = express.Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const { usersRouter } = require('./users');
const { moviesRouter } = require('./movies');

const {
  loginValidation,
  registerValidation,
} = require('../middlewares/validations');

const { login, createUser } = require('../controllers/users');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signin', loginValidation, login);
routes.post('/signup', registerValidation, createUser);

routes.use(auth);
routes.use('/', usersRouter);
routes.use('/', moviesRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = routes;
