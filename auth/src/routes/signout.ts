import { Request, Response, Router } from 'express';

export const signOutRouter = Router();

signOutRouter.post('/signOut', (request: Request, response: Response) => {
	request.session = null;

	response.send({});
});
