const application = require('./application');
const config = require('config');

const apiConfig = config.get('api');

application.listen(apiConfig.port);