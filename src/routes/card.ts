import { Router } from 'express';
import { getCards, createCard, deleteCard } from '../controllers/card';

const cardRouter = Router();

cardRouter.get('/', getCards);

cardRouter.post('/', createCard);

cardRouter.get('/:cardId', deleteCard);

export default cardRouter;
