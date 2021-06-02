const mongoose = require('mongoose');
const validator = require('validator');
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
      validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите корректную ссылку',
    },
  },
  trailer: {
    type: String,
    required: true,
      validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите корректную ссылку',
    },
  },
  thumbnail: {
    type: String,
    required: true,
      validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Введите корректную ссылку',
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },





})