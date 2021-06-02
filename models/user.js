const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const DefaultError = require('../middlewares/defaultError');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Имя',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Строка должна содержать Email!',
    },
    password: {
      type: String,
      required: true,
      select: false,
    }
  }
})
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new DefaultError(401, 'Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new DefaultError(401, 'Неправильные почта или пароль');
          }

          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);