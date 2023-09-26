import { Request, Response, Router } from 'express';
import { errorsValidator, signUpValidator } from '../middlewares/validators';

export const signUpRouter = Router();

signUpRouter.use(signUpValidator);
signUpRouter.use(errorsValidator);

signUpRouter.post('/signUp', (request: Request, response: Response) => {
	const { email, password } = request.body;

	console.log('Creating a user..');

	response.json({});
});
