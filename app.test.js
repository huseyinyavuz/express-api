const app = require('./index');

const request = require('supertest');

describe('Dummy test', () => {
    it('Hello World', async () => {
        const response = await request(app).get('/');
        console.log(response.text);
        expect(response.text).toEqual('Getir Assignment');
        expect(response.statusCode).toEqual(200);
        done();
    });
});

describe('Post Request Tests', () => {
    it('Post Request with valid data', async () => {

        var testRequest = { 
            "startDate": "2017-01-01", 
            "endDate": "2017-01-17", 
            "minCount": 20, 
            "maxCount": 1000
        }

        const response = await request(app).post('/').send(testRequest);
        expect(JSON.parse(response.text).code).toEqual(0);
        expect(response.statusCode).toEqual(200);
        done();
    });


    it('Post Request with missing data', async () => {

        var testRequest = {  
            "endDate": "2017-01-17", 
            "minCount": 20, 
            "maxCount": 1000
        }
  
        const response = await request(app).post('/').send(testRequest);
        expect(JSON.parse(response.text).code).toEqual(2);
        expect(response.statusCode).toEqual(400);
        done();
    });

    it('Post Request with invalid date', async () => {

        var testRequest = {
            "startDate": "absbasbab",  
            "endDate": "2017-01-17", 
            "minCount": 20, 
            "maxCount": 1000
        }

        const response = await request(app).post('/').send(testRequest);
        expect(JSON.parse(response.text).code).toEqual(3);
        expect(JSON.parse(response.text).records.length).toEqual(0);
        expect(response.statusCode).toEqual(400);
        done();
    });

});