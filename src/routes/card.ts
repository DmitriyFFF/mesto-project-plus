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

cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/:cardId/likes', addLike);

cardRouter.delete('/:cardId/likes', deleteLike);

export default cardRouter;
