const Movies = require('../models/movie');

const { CREATED } = require('../utils/errorMessage');

const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => {
      if (!movies || movies.length === 0) {
        //res.send({ message: 'Сохраненных фильмов не найдено.' });
        return next(new NotFoundError('Сохраненных фильмов не найдено.'));
      }
      res.send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movies.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner.valueOf() !== req.user._id) {
        return next(new ForbiddenError('Можно удалять только ваши фильмы'));
      }
      return Movies.findByIdAndRemove(req.params.movieId)
        .then((result) => {
          res.send(result);
        })
        .catch(next);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movies.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
    thumbnail: req.body.thumbnail,
    movieId: req.body.movieId,
    owner: req.user._id,
  })
    .then((movies) => {
      res.status(CREATED).send(movies);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
