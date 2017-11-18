class Orz {
  async init ({ mongodbURI, baseURL, schema, secret, brokerURI, graphqlURI, serviceName }) {
    // Model layer
    await this.initModel(mongodbURI)

    // Server layer
    const { app } = await this.initServer(baseURL, schema)

    // App layer
    await this.initRoute(app, secret)

    // Network layer
    this._broker = await this.initBroker(brokerURI)
    this._broker && this._broker.start()

    // Service layer
    graphqlURI = graphqlURI || `${baseURL}/graphql`
    this._worker = await this.initWorker(brokerURI, serviceName)
    this._worker && this._worker.initGraphQL(graphqlURI)
    this._worker && this._worker.start()
  }

  async initModel (mongodbURI) {
    // Mongoose
    if (mongodbURI) {
      this._mongoose = await require('./model')(mongodbURI).catch(err => console.error(`MongoDB :`, err))
    }
  }

  async initServer (baseURL, schema) {
    // GraphQLServer
    if (!baseURL) throw new Error('Required : baseURL')
    if (schema) {
      const { GraphQLServer } = require('@rabbotio/rainbow')
      this._server = new GraphQLServer(baseURL, schema)
    } else {
      const { Server } = require('@rabbotio/rainbow')
      this._server = new Server(baseURL)
    }

    return this._server
  }

  async initRoute (app, secret) {
    // Route
    require('./routes')(app)

    // OAuth
    require('./oauth').init(app, secret)

    return this._server
  }

  async initBroker (brokerURI) {
    if (!brokerURI) return

    const { Broker } = require('@rabbotio/rainbow')
    const broker = new Broker(brokerURI)

    return broker
  }

  async initWorker (brokerURI, serviceName) {
    if (!brokerURI) return
    if (!serviceName) return

    const { Worker } = require('@rabbotio/rainbow')
    const worker = new Worker(brokerURI, serviceName)
    return worker
  }

  async start () {
    // Server
    await this._server.start()

    // Ready
    const { version } = require('./package.json')
    console.info(`ORZ      : v${version} (${process.env.NODE_ENV}) is ready, enjoy! 🚀`) // eslint-disable-line
    return true
  }

  async stop () {
    if (this._mongoose) {
      await this._mongoose.disconnect()
      this._mongoose = null
      console.info(`MongoDB    : bye!`)
    }

    if (this._server) {
      await this._server.stop()
      this._server = null
    }

    if (this._worker) {
      await this._worker.stop()
      this._worker = null
      console.info(`Worker   : bye!`)
    }

    if (this._broker) {
      await this._broker.stop()
      this._broker = null
      console.info(`Broker   : bye!`)
    }

    return true
  }
}

module.exports = Orz
