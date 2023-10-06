import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config';

interface UserPayload {
	id: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export function currentUser(request: Request, response: Response, next: NextFunction) {
	if (!request.session?.jwt) {
		return next();
	}

	try {
		const payload = jwt.verify(request.session.jwt, env.JWT_KEY) as UserPayload;

		request.currentUser = payload;
	} catch {}

	next();
}
