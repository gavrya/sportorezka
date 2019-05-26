const path = require('path');
const config = require('config');

const BASE_PATH = path.join(__dirname, 'server', 'database');

const knexConfig = {
  development: {
    client: 'mysql',
    connection: config.connection,
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};

module.exports = knexConfig;
