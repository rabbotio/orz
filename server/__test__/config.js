const config = {
  isProd: function get () {
    return process.env.NODE_ENV === 'production'
  },
  secret: 'good morning teacher sit down',
  mongodb_uri: 'mongodb://localhost/oauth',
  base_url: 'http://localhost:3030'
}

module.exports = config
