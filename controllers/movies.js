const { Movie } = require('../models/movie');
const DefaultError = require('../middlewares/defaultError');

exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch(next);
};
exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new DefaultError(400, 'Переданы некорректные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new DefaultError(409, 'фильм с таким movieId уже существует');
      }
    })
    .catch(next);
};

exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    .then((movie) => {
      console.log(movie._id);
      if (!movie) {
        throw new DefaultError(404, 'Карточка не найдена');
      }

      if (movie.owner.toString() !== req.user._id) {
        throw new DefaultError(403, 'Нет прав для совершения данной операции');
      }

      return Movie.deleteOne({ _id: movie._id })
        .then(() => res.status(200).send('Карточка удалена'));
    })
    .catch(next);
};
