import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurUser,
} from '../controllers/users';
import {
  updateAvatarValidator,
  updateProfileValidator,
  userIdValidator,
} from '../middlewares/validation';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', userIdValidator, getUserById);

userRouter.get('/me', getCurUser);

userRouter.patch('/me', updateProfileValidator, updateProfile);

userRouter.patch('/me/avatar', updateAvatarValidator, updateAvatar);

export default userRouter;
