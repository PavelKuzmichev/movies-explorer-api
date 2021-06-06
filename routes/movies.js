const express = require('express');
const { celebrate, Joi } = require('celebrate');

const movieRoutes = express.Router();
const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');

movieRoutes.get('/', getMovies);
movieRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(5000),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
    image: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
    trailer: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
    thumbnail: Joi.string().required().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/),
    movieId: Joi.number().required(),
  }),
}), createMovie);
movieRoutes.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);
exports.movieRoutes = movieRoutes;
