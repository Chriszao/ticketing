import request from 'supertest';
import { HttpStatusCode } from '../../@types';
import { app } from '../../app';

describe('POST /api/users/signIn', () => {
	it('should fail when email that does not exist is supplied', async () => {
		const response = await request(app).post('/api/users/signIn').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});

	it('should fail when an incorrect password is supplied', async () => {
		let response = await request(app).post('/api/users/signUp').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.Created);

		response = await request(app).post('/api/users/signIn').send({
			email: 'test@test.com',
			password: 'p',
		});

		expect(response.status).toBe(HttpStatusCode.BadRequest);
	});

	it('should responds with a cookie when given valid credentials', async () => {
		let response = await request(app).post('/api/users/signUp').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.Created);

		response = await request(app).post('/api/users/signIn').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.OK);
		expect(response.get('Set-Cookie')).toBeDefined();
	});
});
