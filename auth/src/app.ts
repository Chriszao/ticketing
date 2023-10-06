import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { router } from './routes';

export const app = express();

app.set('trust proxy', true); // Requests are being proxied through the nginx ingress controller

app.use(json());
app.use(
	cookieSession({
		signed: false,
		secure: true,
	}),
);
app.use('/api', router);

app.all('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);
