import { Request, Response } from 'express';
import user from '../models/user';

export const getUsers = (req: Request, res: Response) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  user.findById(id)
    .then((userData) => res.send({ data: userData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
