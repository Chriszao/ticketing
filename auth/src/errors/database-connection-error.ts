import { HttpStatusCode } from '../@types';
import { CustomError, SerializedError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	statusCode = HttpStatusCode.InternalServerError;

	private reason = 'Error connecting to database';

	constructor() {
		super('Error connecting to database');

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors(): SerializedError[] {
		return [{ message: this.reason }];
	}
}
