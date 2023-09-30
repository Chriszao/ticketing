import { Request, Response, Router } from 'express';
import { errorsValidator, signUpValidator } from '../middlewares/validators';
import { User } from '../models';
import { BadRequestError } from '../errors';

export const signUpRouter = Router();

signUpRouter.use(signUpValidator);
signUpRouter.use(errorsValidator);

signUpRouter.post('/signUp', async (request: Request, response: Response) => {
	const { email, password } = request.body;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		throw new BadRequestError('E-mail already in use');
	}

	const newUser = User.build({ email, password });

	await newUser.save();

	response.status(201).send(newUser);
});
