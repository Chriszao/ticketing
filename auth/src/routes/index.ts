import { Router } from 'express';
import { signInRouter } from './signin';
import { signOutRouter } from './signout';
import { signUpRouter } from './signup';
import { currentUserRouter } from './current-user';

export const router = Router();

router.use('/users', signInRouter);
router.use('/users', signOutRouter);
router.use('/users', signUpRouter);
router.use('/users', currentUserRouter);
