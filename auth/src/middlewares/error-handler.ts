import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';
import { HttpStatusCode } from '../@types';

export function errorHandler(err: Error, _: Request, response: Response, __: NextFunction) {
	if (err instanceof CustomError) {
		return response.status(err.statusCode).json({ errors: err.serializeErrors() });
	}

	response
		.status(HttpStatusCode.InternalServerError)
		.send({ errors: [{ message: 'Something went wrong!' }] });
}
