import { Router } from 'express';
import { signInRouter } from './signin';
import { signOutRouter } from './signout';
import { signUpRouter } from './signup';
import { currentUserRouter } from './current-user';

export const router = Router();

router.use('/api/users', signInRouter);
router.use('/api/users', signOutRouter);
router.use('/api/users', signUpRouter);
router.use('/api/users', currentUserRouter);
