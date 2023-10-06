import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors';
import { errorsValidator, signUpValidator } from '../middlewares/validators';
import { User } from '../models';
import { HttpStatusCode } from '../@types';
import { env } from '../config';

export const signUpRouter = Router();

signUpRouter.post(
	'/signUp',
	signUpValidator,
	errorsValidator,
	async (request: Request, response: Response) => {
		const { email, password } = request.body;

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			throw new BadRequestError('E-mail already in use');
		}

		const newUser = User.build({ email, password });

		await newUser.save();

		const jwtToken = jwt.sign({ id: newUser.id, email: newUser.email }, env.JWT_KEY);

		request.session = { jwt: jwtToken };

		response.status(HttpStatusCode.Created).send(newUser);
	},
);
