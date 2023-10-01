import { NextFunction, Request, Response } from 'express';
import card from '../models/card';
import {
  CREATED,
  NOT_FOUND,
  SUCCESS,
} from '../utils/constants';
import ErrorApi from '../utils/errorApi';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  card.find({})
    .then((cards) => res.status(SUCCESS).send({ data: cards }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  card.findByIdAndDelete(id)
    .orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  card.create({ name, link, owner })
    .then((cardData) => res.status(CREATED).send({ data: cardData }))
    .catch(next);
};

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch(next);
};

export const deleteLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .orFail(new ErrorApi(NOT_FOUND, 'Not Found'))
    .then((cardData) => res.status(SUCCESS).send({ data: cardData }))
    .catch(next);
};
