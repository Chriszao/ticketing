import mongoose from 'mongoose';
import { app } from './app';

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
