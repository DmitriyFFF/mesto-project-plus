import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import user from '../models/user';
import {
  SUCCESS,
  CREATED,
  NOT_FOUND,
  REQUEST_CONFLICT,
} from '../utils/constants';
import ErrorApi from '../utils/errorApi';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  user.findById(id).orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
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
};

export const updateProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { name, about }, { new: true, runValidators: true })
    .orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { avatar }, { new: true, runValidators: true })
    .orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return user.findUserByCredentials(email, password)
    .then((userData) => {
      const token = jwt.sign({ _id: userData._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

export const getCurUser = (req: Request, res: Response, next: NextFunction) => {
  user.findById(req.body.user?._id).orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((userData) => res.status(SUCCESS).send({ data: userData }))
    .catch(next);
};
