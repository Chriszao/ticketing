import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { router } from './routes';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();

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

async function start() {
	if (!process.env.JWT_KEY) {
		throw new Error('JWT_KEY env variable must be defined');
	}

	try {
		await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
		console.log('✨ Connected to MongoDB!');
	} catch (error) {
		console.error(error);
	}

	app.listen(3000, () => {
		console.log('🚀 Listening on port 3000!');
	});
}

start();
