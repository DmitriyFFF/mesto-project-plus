/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import user from '../models/user';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  REQUEST_CONFLICT,
} from '../utils/constants';
import ErrorApi from '../utils/errorApi';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(next);
  // .catch((err) => res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера'));
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  user.findById(id).orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === 'Not Found') {
  //     res.status(NOT_FOUND).send('Запрашиваемый пользователь не найден');
  //   } else if (err instanceof mongoose.Error.CastError) {
  //     res.status(BAD_REQUEST).send('Переданы не валидные данные');
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера');
  //   }
  // });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash: string) => user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((userData) => res.status(CREATED).send({ data: userData }))
    .catch((err) => {
      if (err.code === 11000) {
        res.status(REQUEST_CONFLICT).send({ message: 'Пользователь с таким email уже существует' });
      } else {
        next(err);
      }
    });
  // .catch((err) => {
  //   if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(BAD_REQUEST).send('Переданы не валидные данные');
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера');
  //   }
  // });
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === 'Not Found') {
  //     res.status(NOT_FOUND).send('Запрашиваемый пользователь не найден');
  //   } else if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(BAD_REQUEST).send('Переданы не валидные данные');
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера');
  //   }
  // });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === 'Not Found') {
  //     res.status(NOT_FOUND).send('Запрашиваемый пользователь не найден');
  //   } else if (err instanceof mongoose.Error.ValidationError) {
  //     res.status(BAD_REQUEST).send('Переданы не валидные данные');
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера');
  //   }
  // });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
  // .catch((err) => {
  //   res.status(401).send({ message: err.message });
  // });
};

export const getCurUser = (req: Request, res: Response, next: NextFunction) => {
  // const userId = req.user?._id;
  user.findById(req.body.user?._id).orFail(new Error('Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === 'Not Found') {
  //     res.status(NOT_FOUND).send('Запрашиваемый пользователь не найден');
  //   } else if (err instanceof mongoose.Error.CastError) {
  //     res.status(BAD_REQUEST).send('Переданы не валидные данные');
  //   } else {
  //     res.status(INTERNAL_SERVER_ERROR).send('Внутренняя ошибка сервера');
  //   }
  // });
};
