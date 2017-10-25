const UserModel = require('../models/userModel');

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
     
    if(Array.isArray(addedResult)) {
      return addedResult.map(userResult => userResult.toObject());
    }

    return addedResult.toObject();
  },
  delete: async function(query = {}) {
    const deleteResult = await UserModel.remove(query);
    
    return deleteResult;
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
