import mongoose from 'mongoose';
import request from 'supertest';
import { HttpStatusCode } from '../@types';
import { app } from '../app';
import { loadEnvVariables } from '../config';

declare global {
	var signIn: () => Promise<string[]>;
}

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

global.signIn = async () => {
	const email = 'test@test.com';
	const password = 'password';

	const response = await request(app)
		.post('/api/users/signUp')
		.send({
			email,
			password,
		})
		.expect(HttpStatusCode.Created);

	const cookie = response.get('Set-Cookie');

	return cookie;
};
