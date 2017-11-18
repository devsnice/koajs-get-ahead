const UserModel = require("../models/userModel");

const userController = {
  get: async function(query = {}) {
    const users = await UserModel.find(query);

    return users.map(user => user.toObject());
  },
  getById: async function(id) {
    const user = await UserModel.findById(id);

    return user.toObject();
  },
  add: async function(data = {}) {
    const addedResult = await UserModel.create(data);

    if (Array.isArray(addedResult)) {
      return addedResult.map(userResult => userResult.toObject());
    }

    return addedResult.toObject();
  },
  delete: async function(query = {}) {
    const findedUsers = this.get(query);

    if (!findedUsers.length) {
      throw new Error("NotFoundError");
    }

    return findedUsers.map(user => user.remove());
  },
  // TODO: make updating a model in the correct way
  // find -> save
  update: async function(query = {}, updateFields = {}) {
    const users = await this.get(query);

    return users.map(user => {
      return user.toObject();
    });
  }
};

module.exports = userController;
