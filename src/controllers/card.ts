/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import card from '../models/card';
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from '../constants/statusCodes';

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((cards) => res.status(SUCCESS).send({ data: cards }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndDelete(id)
    .orFail(new Error('NotFound'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send('Запрашиваемые данные не найдены');
      } else if (mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send('Переданы не валидные данные');
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  card.create({ name, link, owner })
    .then((cardData) => res.status(CREATED).send({ data: cardData }))
    .catch((err) => {
      if (mongoose.Error.ValidationError) {
        res.status(BAD_REQUEST).send('Переданы не валидные данные');
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

export const addLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send('Запрашиваемые данные не найдены');
      } else if (mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send('Переданы не валидные данные');
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

export const deleteLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(new Error('NotFound'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch((err) => {
      if (err.message === 'Not Found') {
        res.status(NOT_FOUND).send('Запрашиваемые данные не найдены');
      } else if (mongoose.Error.CastError) {
        res.status(BAD_REQUEST).send('Переданы не валидные данные');
      } else {
        res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};
