const config = {
  isProd: function get () {
    return process.env.NODE_ENV === 'production'
  },
  secret: 'good morning teacher sit down',
  mongodbURI: 'mongodb://localhost/oauth',
  baseURL: 'http://localhost:3030'
}

module.exports = config
