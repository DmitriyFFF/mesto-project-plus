import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/card';
import { NOT_FOUND } from './utils/constants';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import errorHandler from './middlewares/error';
import { requestLogger, errorLogger } from './middlewares/logger';
import { createUserValidator, loginValidator } from './middlewares/validation';

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
