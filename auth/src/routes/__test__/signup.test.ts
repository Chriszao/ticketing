import request from 'supertest';
import { HttpStatusCode } from '../../@types';
import { app } from '../../app';

describe('POST /api/users/signup', () => {
	it('should return 201 on successful signup', async () => {
		const response = await request(app).post('/api/users/signup').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.Created);
	});

	it('should return 400 with an invalid email', async () => {
		const response = await request(app).post('/api/users/signup').send({
			email: 'invalid email',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});

	it('should return 400 with an invalid password', async () => {
		const response = await request(app).post('/api/users/signup').send({
			email: 'test@test.com',
			password: 'p',
		});

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});

	it('should return 400 with missing email and password', async () => {
		let response = await request(app).post('/api/users/signup').send({});

		expect(response.status).toBe(HttpStatusCode.BadRequest);

		response = await request(app).post('/api/users/signup').send({ email: 'test@test.com' });

		expect(response.status).toBe(HttpStatusCode.BadRequest);

		response = await request(app).post('/api/users/signup').send({ password: 'password' });

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});

	it('should disallow duplicate emails', async () => {
		let response = await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' });

		expect(response.status).toBe(HttpStatusCode.Created);

		response = await request(app)
			.post('/api/users/signup')
			.send({ email: 'test@test.com', password: 'password' });

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});
});
