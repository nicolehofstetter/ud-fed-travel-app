import app from '../src/server/server'; // Link to server file
const supertest = require('supertest');
const request = supertest(app);

describe('Get latest travel data', () => {

    test('should return empty object on start', async (done) => {

        const response = await request.get('/api/travels/latest');

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual({});
        done();
    });

});