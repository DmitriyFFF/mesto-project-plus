import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
} from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCard);

cardRouter.delete('/:id', deleteCard);

cardRouter.put('/:id/likes', addLike);

cardRouter.delete('/:id/likes', deleteLike);

export default cardRouter;
