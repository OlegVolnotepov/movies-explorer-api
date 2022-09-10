require('dotenv').config();
const express = require('express');
const cors = require('cors');
const limiter = require('express-rate-limit');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const { limiterParams } = require('./utils/constants');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(limiter(limiterParams));

const {
  PORT = 3003,
  DATABASE_URL,
  NODE_ENV,
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

app.use(routes);

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
