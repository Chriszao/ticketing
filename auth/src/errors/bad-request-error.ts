import { HttpStatusCode } from '../@types';
import { CustomError, SerializedError } from './custom-error';

export class BadRequestError extends CustomError {
	statusCode = HttpStatusCode.BadRequest;

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	serializeErrors(): SerializedError[] {
		return [{ message: this.message }];
	}
}
