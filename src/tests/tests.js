const assert = require("assert");
const request = require("request-promise").defaults({
  resolveWithFullResponse: true,
  simple: false
});
const config = require("config");
const faker = require("faker");

const application = require("../application");
const User = require("../models/userModel");
const apiConfig = config.get("api");

const STAND_URL = `http://localhost:${apiConfig.port}`;
let server = null;

const getFakeUser = () => ({
  name: faker.name.firstName(),
  surname: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  city: faker.address.city()
});

const getResultUser = fullDbUser => {
  const { name, surname, email, password, city } = fullDbUser;

  return { name, surname, email, password, city };
};

describe("Test the server", () => {
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

  it("Server should started", async () => {
    const response = await request.get(STAND_URL);

    assert.equal(response.body, "It a root of  application");
  });

  describe("Test API", () => {
    describe("/api/users", () => {
      const endpointModelUrl = `${STAND_URL}/api/users`;

      beforeEach(() => {
        User.remove({});
      });

      describe("POST /api/users", () => {
        it("User should save in db", async () => {
          const testUser = getFakeUser();

          const response = await request({
            method: "post",
            uri: endpointModelUrl,
            json: true,
            body: {
              data: testUser
            }
          });

          const resultUser = getResultUser(response.body);

          assert.deepEqual(testUser, resultUser);
        });

        it("User should have required fields", async () => {
          const testUser = {
            empty: "I'm empty user :("
          };

          const response = await request({
            method: "post",
            uri: endpointModelUrl,
            json: true,
            body: {
              data: testUser
            }
          });

          assert.equal(400, response.statusCode);
        });

        it("User should have unique e-mail", async () => {
          const testUser = getFakeUser();

          const response = await request({
            method: "post",
            uri: endpointModelUrl,
            json: true,
            body: {
              data: [testUser, testUser]
            }
          });

          assert.equal(400, response.statusCode);
        });

        it("Array of users should save in db", async () => {
          const testUsers = [getFakeUser(), getFakeUser(), getFakeUser()];

          const response = await request({
            method: "post",
            uri: endpointModelUrl,
            json: true,
            body: {
              data: testUsers
            }
          });

          const resultUsers = response.body.map(user => getResultUser(user));

          assert.deepEqual(testUsers, resultUsers);
        });
      });
    });
  });
});
