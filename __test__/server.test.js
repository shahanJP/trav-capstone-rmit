
//reference https://dev.to/eetukudo_/server-side-testing-with-jest
const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

describe('Correct endpoints', () => {
	
	test('Checks if GET route / status is 200', async () => {
		const response = await request
			.get('/');
		
		expect(response.status).toBe(200);
		;
	})
})

