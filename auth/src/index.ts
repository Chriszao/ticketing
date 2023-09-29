import { json } from 'body-parser';
import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { router } from './routes';
import mongoose from 'mongoose';

const app = express();

app.use(json());

app.use(router);

app.all('*', async () => {
	throw new NotFoundError();
});

app.use(errorHandler);

async function start() {
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
