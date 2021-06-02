const express = require('express');
const DefaultError = require('../middlewares/defaultError');

const routes = express.Router();
const { userRoutes } = require('./users');
const { cardRoutes } = require('./cards');

routes.use('/movies', cardRoutes);
routes.use('/users', userRoutes);
routes.use('/', () => {
  throw new DefaultError(404, 'Запрашиваемый ресурс не найден');
});
exports.routes = routes;