const express = require('express');
const { celebrate, Joi } = require('celebrate');
const DefaultError = require('../middlewares/defaultError');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

const routes = express.Router();
const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);
routes.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), createUser);
routes.use(auth);
routes.use('/movies', movieRoutes);
routes.use('/users', userRoutes);
routes.use('/', () => {
  throw new DefaultError(404, 'Запрашиваемый ресурс не найден');
});
exports.routes = routes;
