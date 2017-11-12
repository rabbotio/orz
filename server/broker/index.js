module.exports = (app, config) => {
  const zerorpc = require('zerorpc')

  const server = new zerorpc.Server({
    addMan: function (sentence, reply) {
      reply(null, sentence + ', man!')
    },

    add42: function (n, reply) {
      reply(null, n + 42)
    },

    iter: function (from, to, step, reply) {
      for (let i = from; i < to; i += step) {
        reply(null, i, true)
      }

      reply()
    }
  })

  server.bind('tcp://0.0.0.0:4242')

  server.on('error', error => {
    console.error('RPC server error:', error)
  })

  /*
  require('./sniff')(aedes)

  server.on('ready', () => {
    require('./authen')(server)
    require('./authorize')(server)

    debug.info(`Aedes   : Ready!`)
  })
  */
}
