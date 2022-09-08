const express = require('express');

const moviesRouter = express.Router();
const {
  movieIdValidation,
  createMovieValidation,
} = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/movies', getMovies);

moviesRouter.post('/movies', createMovieValidation, createMovie);

moviesRouter.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = { moviesRouter };
