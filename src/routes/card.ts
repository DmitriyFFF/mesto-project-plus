import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} from '../controllers/card';
import {
  cardIdValidator,
  createCardValidator,
} from '../middlewares/validation';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCardValidator, createCard);

cardRouter.delete('/:id', cardIdValidator, deleteCard);

cardRouter.put('/:id/likes', cardIdValidator, addLike);

cardRouter.delete('/:id/likes', cardIdValidator, deleteLike);

export default cardRouter;
