import mongoose from 'mongoose';
import { loadEnvVariables } from '../config';

beforeAll(async () => {
	process.env.JWT_KEY = 'asdfasdadasd';

	loadEnvVariables();

	await mongoose.connect(process.env.MONGO_URI!);
});

beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();

	for (const collection of collections) {
		await collection.deleteMany({});
	}
});

afterAll(async () => {
	await mongoose.connection.close();
});
