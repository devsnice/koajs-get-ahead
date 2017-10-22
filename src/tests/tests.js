const assert = require('assert');
const request = require('request-promise');
const config = require('config');

const application = require('../application');
const apiConfig = config.get('api');

const STAND_URL = `http://localhost:${apiConfig.port}`;
let server = null;

describe('Test the server', () => {
    before(() => {
        server = application.listen(apiConfig.port, () => {
            console.log(`Server started on ${apiConfig.port} port`);
        });
    });

    after(() => {
        server.close(() => {
            console.log(`Server closed on ${apiConfig.port} port`);
        });
    });

    it('Server should started', async () => {
        const result = await request.get(STAND_URL);

        assert.equal(result, "It a root of  application");
    })

    describe('Test API', () => {
        describe('User', () => {
          // test cases
        });
    });
})