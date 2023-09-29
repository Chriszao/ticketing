import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';

export function errorHandler(err: Error, _: Request, response: Response, __: NextFunction) {
	if (err instanceof CustomError) {
		return response.status(err.statusCode).json({ errors: err.serializeErrors() });
	}

	response.status(500).send({ errors: [{ message: 'Something went wrong!' }] });
}
