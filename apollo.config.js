const config = require('./config')

console.log('GQL_SCHEMA_ENDPOINT') //eslint-disable-line
console.log(config.GQL_SCHEMA_ENDPOINT,) //eslint-disable-line

module.exports = {
  client: {
    service: {
      name: 'wardrobe-server',
      url: config.GQL_SCHEMA_ENDPOINT,
    },
  },
}
