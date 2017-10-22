const UserModel = require('../models/userModel');

const userController = {
  get: async function(query = {}) {
    const result = await UserModel.find(query)
      .then(results => {
        return results;
      })
      .catch(error => {
        throw error;
      });

      return result;
  },
  getById: async function(id) {
    const result = await UserModel.findById(id)
      .then(results => {
        return results;
      })
      .catch(error => {
        throw error;
      });

      return result;
  },
  add: async function(query = {}) {
    const result = await UserModel.create(query)
      .then(results => {
        return results;
      })
      .catch(error => {
        throw error;
      });

    return result;
  },
  delete: async function(query = {}) {
    const result = await UserModel.remove(query)
      .then(results => {
        return results;
      })
      .catch(error => {
        throw error;
      });

    return result;
  },
  update: async function(query = {}, updateFields = {}) {

    const result = await UserModel.update(query, updateFields)
      .then(results => {
        return results;
      })
      .catch(error => {
        throw error;
      });

    return result;
  }
};

module.exports = userController;
