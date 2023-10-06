import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '../@types';
import { BadRequestError } from '../errors';
import { errorsValidator, signInValidator } from '../middlewares/validators';
import { User } from '../models';
import { Password } from '../services';
import { env } from '../config';

export const signInRouter = Router();

signInRouter.use(signInValidator);
signInRouter.use(errorsValidator);

signInRouter.post('/signIn', async (request: Request, response: Response) => {
	const { email, password } = request.body;

	const existingUser = await User.findOne({ email });

	if (!existingUser) {
		throw new BadRequestError('Invalid credentials');
	}

	const passwordsMatch = await Password.compare(existingUser.password, password);

	if (!passwordsMatch) {
		throw new BadRequestError('Invalid credentials');
	}

	const jwtToken = jwt.sign({ id: existingUser.id, email: existingUser.email }, env.JWT_KEY!);

	request.session = { jwt: jwtToken };

	response.status(HttpStatusCode.OK).send(existingUser);
});
