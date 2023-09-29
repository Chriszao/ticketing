import { Request, Response, Router } from 'express';
import { errorsValidator, signUpValidator } from '../middlewares/validators';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const signUpRouter = Router();

signUpRouter.use(signUpValidator);
signUpRouter.use(errorsValidator);

signUpRouter.post('/signUp', (request: Request, response: Response) => {
	const { email, password } = request.body;

	console.log('Creating a user..');

	throw new DatabaseConnectionError();

	// response.json({});
});
