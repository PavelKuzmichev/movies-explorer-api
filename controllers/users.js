const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const DefaultError = require('../middlewares/defaultError');

const { NODE_ENV, JWT_SECRET } = process.env;
exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new DefaultError(404, 'Данный пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};
exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(200).send({
      data: {
        name: user.name, email: user.email, _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new DefaultError(400, 'Переданы некорректные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new DefaultError(409, 'Пользователь с таким E-mail уже существует');
      }
    })
    .catch(next);
};
exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((userProfile) => {
      res.status(200).send(userProfile);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new DefaultError(400, 'Переданы некорректные данные');
      } else if (err.message === 'NotValidId') {
        throw new DefaultError(404, 'Данный пользователь не найден');
      }
    })
    .catch(next);
};
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-key',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .status(200).send({ token });
    })
    .catch(next);
};
