import request from 'supertest';
import { HttpStatusCode } from '../../@types';
import { app } from '../../app';

describe('GET /api/users/currentUser', () => {
	it('should return current logged user', async () => {
		const cookie = await signIn();

		const response = await request(app).get('/api/users/currentUser').set('Cookie', cookie);

		expect(response.status).toBe(HttpStatusCode.OK);
		expect(response.body.currentUser.email).toEqual('test@test.com');
	});

	it('should returns null if not authenticated', async () => {
		const response = await request(app).get('/api/users/currentUser');

		expect(response.status).toBe(HttpStatusCode.OK);
		expect(response.body.currentUser).toBeNull();
	});
});
