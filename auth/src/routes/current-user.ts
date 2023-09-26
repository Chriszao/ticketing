import { Router } from 'express';

export const currentUserRouter = Router();

currentUserRouter.get('/api/users/currentUser', (req, res) => {});
