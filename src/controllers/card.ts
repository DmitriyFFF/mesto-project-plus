/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import card from '../models/card';
import {
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
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
      } else {
        res.status(SUCCESS).send({ data: cardData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  card.create({ name, link, owner })
    .then((cardData) => res.status(CREATED).send({ data: cardData }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const addLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
      } else {
        res.status(SUCCESS).send({ data: cardData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const deleteLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .then((cardData) => {
      if (!cardData) {
        res.status(NOT_FOUND).send({ message: 'Запрашиваемые данные не найдены' });
      } else {
        res.status(SUCCESS).send({ data: cardData });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};
