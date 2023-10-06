import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors';

export function requireAuth(request: Request, response: Response, next: NextFunction) {
	if (!request.currentUser) {
		throw new NotAuthorizedError();
	}

	next();
}
