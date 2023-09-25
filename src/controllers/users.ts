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

export const updateProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;
  const { id } = req.params;

  user.findByIdAndUpdate(id, name, about)
    .then((userData) => res.send({ data: userData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

export const updateAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  const { id } = req.params;

  user.findByIdAndUpdate(id, avatar)
    .then((userData) => res.send({ data: userData }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
