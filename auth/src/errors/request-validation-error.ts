import { ValidationError } from 'express-validator';
import { CustomError, SerializedError } from './custom-error';
import { HttpStatusCode } from '../@types';

export class RequestValidationError extends CustomError {
	statusCode = HttpStatusCode.BadRequest;

	constructor(private errors: ValidationError[]) {
		super('Invalid request parameters');

		Object.setPrototypeOf(this, RequestValidationError.prototype);
	}

	serializeErrors(): SerializedError[] {
		return this.errors.map((error) =>
			error.type === 'field'
				? {
						message: error.msg,
						field: error.path,
				  }
				: { message: error.msg },
		);
	}
}
