import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../../errors';

export function errorsValidator(request: Request, _: Response, next: NextFunction) {
	const errors = validationResult(request);

	if (!errors.isEmpty()) {
		throw new RequestValidationError(errors.array());
	}

	next();
}
