// TODO: asserts, maybe we need to find another tools for it
// TODO: rewrite tests with random amount of instances

const assert = require("assert");

const config = require("config");
const faker = require("faker");

const application = require("../application");
const User = require("../models/userModel");
const apiConfig = config.get("api");

const requestService = require("../utils/testUtils/requestService");

const STAND_URL = `http://localhost:${apiConfig.port}`;

let server = null;

const request = {};

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
    const response = await requestService.get();

    assert.equal(response.body, "It a root of  application");
  });

  describe("Test API", () => {
    describe("/api/users", () => {
      const modelName = "user";

      beforeEach(async () => {
        await User.remove({});
      });

      describe("POST /api/users", () => {
        it("User should save in db", async () => {
          const testUser = getFakeUser();

          const response = await requestService.post(modelName, {
            data: testUser
          });

          const resultUser = getResultUser(response.body);

          assert.deepEqual(testUser, resultUser);
        });

        it("User should have required fields", async () => {
          const testUser = {
            empty: "I'm empty user :("
          };

          const response = await requestService.post(modelName, {
            data: testUser
          });

          assert.equal(400, response.statusCode);
        });

        it("User should have unique e-mail", async () => {
          const testUser = getFakeUser();

          const response = await requestService.post(modelName, {
            data: [testUser, testUser]
          });

          assert.equal(400, response.statusCode);
        });

        it("Array of users should save in db", async () => {
          const testUsers = [getFakeUser(), getFakeUser(), getFakeUser()];

          const response = await requestService.post(modelName, {
            data: testUsers
          });

          const resultUsers = response.body.map(user => getResultUser(user));

          assert.deepEqual(testUsers, resultUsers);
        });
      });

      // It should return 404 error, if there isn't such user
      describe("GET /api/users", () => {
        it("It should empty set of users from db, cause there isn't users", async () => {
          const response = await requestService.get(modelName);

          const users = response.body;

          assert.deepEqual([], users);
        });

        it("It should get user by id", async () => {
          const testUser = getFakeUser();

          const createdUser = await requestService.post(modelName, {
            data: testUser
          });

          const response = await requestService.get(
            modelName,
            {},
            {
              uriParam: `${createdUser.body["_id"]}`
            }
          );

          const user = getResultUser(response.body);

          assert.deepEqual(testUser, user);
        });

        it("It should get users all users from db", async () => {
          const testUsers = [getFakeUser()];

          await requestService.post(modelName, {
            data: testUsers
          });

          const response = await requestService.get(modelName);

          const users = response.body.map(user => getResultUser(user));

          assert.deepEqual(testUsers, users);
        });

        it("It should get filtered users from db", async () => {
          const testUsers = [getFakeUser(), getFakeUser(), getFakeUser()];
          const filterQuery = {
            email: testUsers[0].email
          };

          await requestService.post(modelName, {
            data: testUsers
          });

          const response = await requestService.get(modelName, {
            query: filterQuery
          });

          const filteredUsers = testUsers.filter(
            user => user.email === filterQuery.email
          );
          const responseUsers = response.body.map(user => getResultUser(user));

          assert.deepEqual(filteredUsers, responseUsers);
        });
      });

      // Сheck status - 404, 200
      // Check amount users in db
      describe("DELETE /api/users", () => {
        it("It should delete user with id from db", async () => {
          const testUser = getFakeUser();

          const createdUser = await requestService.post(modelName, {
            data: testUser
          });

          const response = await requestService.delete(
            modelName,
            {},
            {
              uriParam: createdUser.body["_id"]
            }
          );

          const numberOfUsersShouldRemoved = 1;

          assert.equal(numberOfUsersShouldRemoved, response.body.n);
        });

        it("It should delete user with id from db", async () => {
          const testUsers = [getFakeUser(), getFakeUser(), getFakeUser()];

          const createdUsers = await requestService.post(modelName, {
            data: testUsers
          });

          const response = await requestService.delete(modelName, {
            email: testUsers.email
          });

          const numberOfUsersShouldRemoved = 1;

          console.log("Deleted items:", response.body);

          assert.equal(numberOfUsersShouldRemoved, response.body.n);
        });
      });
    });
  });
});
