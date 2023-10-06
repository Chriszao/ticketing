import { HttpStatusCode } from '../@types';
import { CustomError, SerializedError } from './custom-error';

export class NotFoundError extends CustomError {
	statusCode = HttpStatusCode.NotFound;

	constructor() {
		super('Route not found');

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}

	serializeErrors(): SerializedError[] {
		return [{ message: 'Not found' }];
	}
}
