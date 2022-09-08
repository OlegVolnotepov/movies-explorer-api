const express = require('express');

const usersRouter = express.Router();
const { updateUser, getCurrentUser } = require('../controllers/users');

// const {
//   userIdValidation,
//   updateUserdValidation,
//   updateAvatardValidation,
// } = require('../middlewares/validations');

usersRouter.get('/users/me', getCurrentUser);

usersRouter.patch('/users/me', updateUser);

module.exports = { usersRouter };
