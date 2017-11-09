module.exports = (app, config) => {
  const mosca = require('mosca')

  const settings = {
    port: 1883,
    backend: {
      // using ascoltatore
      type: 'mongo',
      url: 'mongodb://localhost:27017/mqtt',
      pubsubCollection: 'ascoltatori',
      mongo: {}
    }
  }

  const server = new mosca.Server(settings)

  require('./sniff')(server)

  server.on('ready', () => {
    require('./authen')(server)
    require('./authorize')(server)

    debug.info(`Mosca   : ${settings.backend.pubsubCollection}:${settings.port} -> ${settings.backend.url}`)
  })
}
