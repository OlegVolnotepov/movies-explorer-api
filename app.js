const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { usersRouter } = require('./routes/users');
const { moviesRouter } = require('./routes/movies');
const NotFoundError = require('./utils/errors/NotFoundError');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  loginValidation,
  registerValidation,
} = require('./middlewares/validations');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const {
  PORT = 3003,
  DATABASE_URL,
  NODE_ENV = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;
mongoose.connect(
  NODE_ENV === 'production'
    ? DATABASE_URL
    : 'mongodb://localhost:27017/bitfilmsdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  },
);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62f8a529f4e9fad3a622832f',
//   };

//   next();
// });
app.use(requestLogger);
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);

app.use(auth);

app.use(usersRouter);

app.use(moviesRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
