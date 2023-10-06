import { Request, Response, Router } from 'express';
import { currentUser } from '../middlewares';

export const currentUserRouter = Router();

currentUserRouter.get('/currentUser', currentUser, (request: Request, response: Response) => {
	response.send({ currentUser: request.currentUser ?? null });
});
