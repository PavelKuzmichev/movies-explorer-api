require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const { PORT = 3000, NODE_ENV, MONGO_LINK } = process.env;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { routes } = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { limiter } = require('./middlewares/limiter');

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(cors({
  origin: true,
  exposedHeaders: '*',
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(routes);
mongoose.connect(NODE_ENV === 'production' ? MONGO_LINK : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
app.use(errorLogger);
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
app.listen(PORT);
console.log(`App listening on port ${PORT}`);
