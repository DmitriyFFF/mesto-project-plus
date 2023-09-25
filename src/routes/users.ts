import { Router } from 'express';
import { getUsers, getUserById, createUser } from '../controllers/users';

const userRouter = Router();

// userRouter.use(express.json());

userRouter.get('/', getUsers);

userRouter.get('/:userId', getUserById);

userRouter.post('/', createUser);

export default userRouter;
