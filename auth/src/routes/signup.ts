import { Request, Response, Router } from 'express';
import { signUpValidator } from '../middlewares/validators';

export const signUpRouter = Router();

signUpRouter.post(
	'/signUp',
	signUpValidator,
	(request: Request, response: Response) => {
		const { email, password } = request.body;
	},
);
