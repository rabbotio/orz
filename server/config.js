require('dotenv/config')
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const config = {
  isProd: function get () {
    return process.env.NODE_ENV === 'production'
  },
  secret: process.env.SECRET,
  mongodb_uri: process.env.MONGODB_URI || 'mongodb://mongo/graphql',
  base_url: process.env.BASE_URL || 'http://localhost:3000'
}

module.exports = config
