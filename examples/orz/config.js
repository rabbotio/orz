require('dotenv/config')
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const config = {
  isProd: function get () {
    return process.env.NODE_ENV === 'production'
  },
  secret: process.env.SECRET || 'quick brown fox jumps over the lazy dog',
  mongodbURI: process.env.MONGODB_URI, // || 'mongodb://mongo/graphql',
  baseURL: process.env.BASE_URL || 'http://localhost:3030',
  brokerURI: process.env.BROKER_URI || 'tcp://0.0.0.0:9000'
}

module.exports = config
