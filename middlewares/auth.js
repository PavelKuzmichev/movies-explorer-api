const jwt = require('jsonwebtoken');

const DefaultError = require('./defaultError');

exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new DefaultError(401, 'Необходима авторизация');
  }

  let payload;
  try {
    payload = jwt.verify(token, 'dev-key');
    req.user = payload;
    next();
  } catch (err) {
    throw new DefaultError(401, 'Необходима авторизация');
  }
};
