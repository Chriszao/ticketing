import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../@types';
import { env } from '../config';

export const currentUserRouter = Router();

currentUserRouter.get('/currentUser', (request: Request, response: Response) => {
	if (!request.session?.jwt) {
		return response.status(HttpStatusCode.Unauthorized).send({ currentUser: null });
	}
	try {
		const payload = jwt.verify(request.session.jwt, env.JWT_KEY);

		response.send({ currentUser: payload });
	} catch {
		response.status(HttpStatusCode.Unauthorized).send({ currentUser: null });
	}
});
