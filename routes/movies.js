const express = require('express');

const moviesRouter = express.Router();
// const {
//   cardIdValidation,
//   createCardValidation,
// } = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', createMovie);

moviesRouter.delete('/movies/:movieId', deleteMovie);

module.exports = { moviesRouter };
