import { Router } from 'express';
import { currentUserRouter } from './current-user';
import { signInRouter } from './signin';
import { signOutRouter } from './signout';
import { signUpRouter } from './signup';

export const usersRouter = Router();

usersRouter.use('/users', currentUserRouter);
usersRouter.use('/users', signUpRouter);
usersRouter.use('/users', signOutRouter);
usersRouter.use('/users', signInRouter);
