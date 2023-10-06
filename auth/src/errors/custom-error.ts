import { HttpStatusCode } from '../@types';

export interface SerializedError {
	message: string;
	field?: string;
}

export abstract class CustomError extends Error {
	abstract statusCode: HttpStatusCode;

	constructor(message: string) {
		super(message);

		// Only because we are extending a built in class
		Object.setPrototypeOf(this, CustomError.prototype);
	}

	abstract serializeErrors(): SerializedError[];
}
