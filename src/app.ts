import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/card';

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.body.user = {
    _id: '65113f33f45173634569739c',
  };

  next();
});

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
