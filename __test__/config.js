const config = {
  isProd: function get () {
    return process.env.NODE_ENV === 'production'
  },
  secret: 'good morning teacher sit down',
  baseURL: 'http://localhost:6060',
  brokerURI: 'tcp://0.0.0.0:9000',
  serviceName: 'oauth'
}

module.exports = config
