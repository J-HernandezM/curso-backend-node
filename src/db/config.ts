require('ts-node/register')
const { config } = require('../config/config.ts')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,  // Cuando hagamos deploy cambiamos esto
    dialect: 'postgres'
  }
}
