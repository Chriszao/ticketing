import { ValidationError } from 'express-validator';
import { CustomError, SerializedError } from './custom-error';

export class RequestValidationError extends CustomError {
	statusCode = 400;

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
