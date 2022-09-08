const express = require('express');

const usersRouter = express.Router();
const { updateUser, getCurrentUser } = require('../controllers/users');

const {
  updateUserdValidation,
} = require('../middlewares/validations');

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', updateUserdValidation, updateUser);

module.exports = { usersRouter };
