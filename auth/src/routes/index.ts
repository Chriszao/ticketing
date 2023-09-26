import { Router } from 'express';
import { currentUserRouter } from './current-user';

export const router = Router();

router.use(currentUserRouter);
