/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import user from '../models/user';
import {
  SUCCESS,
  INTERNAL_SERVER_ERROR,
  CREATED,
  NOT_FOUND,
} from '../constants/statusCodes';

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  user.findById(id)
    .then((userData) => {
      if (!userData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SUCCESS).send({ data: userData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((userData) => {
      if (!userData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(CREATED).send({ data: userData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { name, about })
    .then((userData) => {
      if (!userData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SUCCESS).send({ data: userData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const id = req.body.user._id;

  user.findByIdAndUpdate(id, { avatar })
    .then((userData) => {
      if (!userData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.status(SUCCESS).send({ data: userData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};
