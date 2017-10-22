const mongoose = require('mongoose');
const config = require('config');

const apiConfig = config.get('api');

mongoose.connect(apiConfig.dbConfig.url, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
