let _server
let _mongoose

module.exports = {
  start: async config => {
    // logger
    this.logger = config.logger || console

    // Mongoose
    _mongoose = await require('./model')(config).catch(err => this.logger.error(`MongoDB :`, err))

    // GraphQLServer
    const { GraphQLServer } = require('@rabbotio/rainbow')
    const { baseURL, schema } = config
    _server = new GraphQLServer(baseURL, schema)
    const { app } = _server

    // Broker
    const { Broker } = require('@rabbotio/rainbow')
    const { brokerURI } = config
    const broker = new Broker(brokerURI)
    broker.start()

    // Route
    require('./routes')(app, config)

    // OAuth
    await require('./oauth').init(app, config)

    // Server
    await _server.start()

    // Ready
    const { version } = require('./package.json')
    this.logger.info(`ORZ      : v${version} (${process.env.NODE_ENV}) is ready, enjoy! 🚀`) // eslint-disable-line
    return true
  },
  stop: async () => {
    await _mongoose.disconnect()
    _mongoose = null
    this.logger.info(`MongoDB  : bye!`)

    await _server.stop()
    _server = null
    this.logger.info(`ORZ      : bye!`)

    return true
  }
}
