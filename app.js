const express = require('express');
const mongoose = require('mongoose');
const { PORT = 3000 } = process.env;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { createUser, login } = require('./controllers/users');
const { routes } = require('./routes/index');
const { auth } = require('./middlewares/auth');


const app = express();
app.use(cors({
  origin: true,
  exposedHeaders: '*',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), login);
app.post('/signup',
celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use(auth);
app.use(routes);
async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  app.use(errors());
  app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res
      .status(statusCode)
      .send({
        message: !message
          ? 'На сервере произошла ошибка' : message,
      });
    return next();
  });

  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}
main();