/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import ErrorApi from '../utils/errorApi';
// import { IError } from '../utils/types';
import { BAD_REQUEST, NOT_FOUND } from '../utils/constants';

export default ((err: ErrorApi, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Что-то пошло не так';

  if (err.statusCode === NOT_FOUND) {
    res.status(NOT_FOUND).send('Запрашиваемый пользователь не найден');
  }
  // const { statusCode = 500, message } = err;

  if (err instanceof mongoose.Error.CastError || mongoose.Error.ValidationError) {
    res.status(BAD_REQUEST).send('Переданы не валидные данные');
  }

  // if (err instanceof mongoose.Error.ValidationError) {
  //   res.status(BAD_REQUEST).send('Переданы не валидные данные');
  // }

  res.status(statusCode).send({ message });

  // }

  // res.status(statusCode).send({
  //   message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  // });
});
