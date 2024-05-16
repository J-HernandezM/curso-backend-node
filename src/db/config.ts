require('ts-node/register')
const { config } = require('../config/config.ts')

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres'
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres'
  }
}
