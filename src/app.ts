import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/card';
import { NOT_FOUND } from './constants/statusCodes';
import { createUser, login } from './controllers/users';

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use((req, res, next) => {
  req.body.user = {
    _id: '65113f33f45173634569739c',
  };

  next();
});

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND).send('Страница не найдена');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
