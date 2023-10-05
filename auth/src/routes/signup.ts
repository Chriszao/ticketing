import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors';
import { errorsValidator, signUpValidator } from '../middlewares/validators';
import { User } from '../models';

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

	const jwtToken = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_KEY!);

	request.session = { jwt: jwtToken };

	response.status(201).send(newUser);
});
