import request from 'supertest';
import { HttpStatusCode } from '../../@types';
import { app } from '../../app';

describe('POST /api/users/signOut', () => {
	it('should clear the cookie after signing out', async () => {
		let response = await request(app).post('/api/users/signUp').send({
			email: 'test@test.com',
			password: 'password',
		});

		expect(response.status).toBe(HttpStatusCode.Created);

		response = await request(app).post('/api/users/signOut').send({});

		expect(response.status).toBe(HttpStatusCode.OK);
		expect(response.get('Set-Cookie')[0]).toEqual(
			'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
		);
	});
});
