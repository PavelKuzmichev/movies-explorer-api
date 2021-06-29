const { Movie } = require('../models/movie');
const DefaultError = require('../middlewares/defaultError');

exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      const data = movie;
      data.owner = owner;
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new DefaultError(400, 'Переданы некорректные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new DefaultError(409, 'фильм с таким movieId уже существует');
      } throw err;
    })
    .catch(next);
};

exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new DefaultError(404, 'Карточка не найдена');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new DefaultError(403, 'Нет прав для совершения данной операции');
      }

      else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((data) => res.status(200).send(data))
          .catch(next);
      }
    })
    .catch(next);
};