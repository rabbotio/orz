module.exports = (app, config) => {
  const aedes = require('aedes')()
  const server = require('net').createServer(aedes.handle)
  const port = 1883

  server.listen(port, () => {
    console.log('server listening on port', port)
  })

  require('./sniff')(aedes)

  server.on('ready', () => {
    require('./authen')(server)
    require('./authorize')(server)

    debug.info(`Aedes   : Ready!`)
  })
}
