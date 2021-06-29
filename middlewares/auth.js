const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const DefaultError = require('./defaultError');

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new DefaultError(401, 'Необходима авторизация11');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-key');
    req.user = payload;
    next();
  } catch (err) {
    throw new DefaultError(401, 'Необходима авторизация111');
  }
};
