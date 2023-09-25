import { Request, Response } from 'express';
import card from '../models/card';

export const getCards = (req: Request, res: Response) => {
  card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndDelete(id)
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = req.body.user._id;

  card.create({ name, link, owner })
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const addLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.body.user._id } },
    { new: true },
  )
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const deleteLike = (req: Request, res: Response) => {
  const { id } = req.params;

  card.findByIdAndUpdate(
    id,
    { $pull: { likes: req.body.user._id } },
    { new: true },
  )
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
