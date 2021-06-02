const express = require('express');
const DefaultError = require('../middlewares/defaultError');

const routes = express.Router();
const { userRoutes } = require('./users');
const { movieRoutes } = require('./movies');

routes.use('/movies', movieRoutes);
routes.use('/users', userRoutes);
routes.use('/', () => {
  throw new DefaultError(404, 'Запрашиваемый ресурс не найден');
});
exports.routes = routes;