const UserModel = require('../models/userModel.js');

const userController = {
  getAll: function(query = {}) {
    return new Promise((resolve, reject) => {
      UserModel.find(query)
        .then(results => {
          return results.toString();
        })
        .then(results => {
          resolve(results);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getById: function() {},
  add: function() {},
  deleteById: function() {},
  updateById: function() {}
};

module.exports = userController;
