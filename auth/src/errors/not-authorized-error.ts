import { HttpStatusCode } from '../@types';
import { CustomError, SerializedError } from './custom-error';

export class NotAuthorizedError extends CustomError {
	statusCode = HttpStatusCode.Forbidden;

	constructor() {
		super('Not authorized');

		Object.setPrototypeOf(this, NotAuthorizedError.prototype);
	}

	serializeErrors(): SerializedError[] {
		return [{ message: 'Not authorized' }];
	}
}
