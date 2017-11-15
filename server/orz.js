let _server
let _mongoose

module.exports = {
  start: async config => {
    // Mongoose
    _mongoose = await require('./model')(config).catch(err => console.error(`MongoDB :`, err))

    // GraphQLServer
    const { baseURL, schema } = config
    // Required
    if (!baseURL) throw new Error('Required : baseURL')

    if (schema) {
      const { GraphQLServer } = require('@rabbotio/rainbow')
      _server = new GraphQLServer(baseURL, schema)
    } else {
      const { Server } = require('@rabbotio/rainbow')
      _server = new Server(baseURL)
    }
    const { app } = _server

    // Broker
    const { brokerURI } = config
    if (brokerURI) {
      const { Broker } = require('@rabbotio/rainbow')
      const broker = new Broker(brokerURI)
      broker.start()
      console.info(`Broker   : ${brokerURI}`)
    }

    // Route
    require('./routes')(app, config)

    // OAuth
    await require('./oauth').init(app, config)

    // Server
    await _server.start()

    // Ready
    const { version } = require('./package.json')
    console.info(`ORZ      : v${version} (${process.env.NODE_ENV}) is ready, enjoy! 🚀`) // eslint-disable-line
    return true
  },
  stop: async () => {
    await _mongoose.disconnect()
    _mongoose = null
    console.info(`MongoDB  : bye!`)

    await _server.stop()
    _server = null
    console.info(`ORZ      : bye!`)

    return true
  }
}
