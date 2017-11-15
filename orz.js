class Orz {
  constructor ({ mongodbURI, baseURL, schema, brokerURI, secret }) {
    this.init({ baseURL, schema, brokerURI, secret })
    this.initModel(mongodbURI)
  }

  init ({ baseURL, schema, brokerURI, secret }) {
    // GraphQLServer
    if (!baseURL) throw new Error('Required : baseURL')
    if (schema) {
      const { GraphQLServer } = require('@rabbotio/rainbow')
      this._server = new GraphQLServer(baseURL, schema)
    } else {
      const { Server } = require('@rabbotio/rainbow')
      this._server = new Server(baseURL)
    }
    const { app } = this._server

    // Broker
    if (brokerURI) {
      const { Broker } = require('@rabbotio/rainbow')
      const broker = new Broker(brokerURI)
      broker.start()
      console.info(`Broker    : ${brokerURI}`)
    }

    // Route
    require('./routes')(app)

    // OAuth
    require('./oauth').init(app, secret).catch(console.error)

    return true
  }

  async initModel (mongodbURI) {
    // Mongoose
    if (mongodbURI) {
      this._mongoose = await require('./model')(mongodbURI).catch(err => console.error(`MongoDB :`, err))
    }
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
    }
    console.info(`MongoDB  : bye!`)

    if (this._server) {
      await this._server.stop()
      this._server = null
    }
    console.info(`ORZ      : bye!`)

    return true
  }
}

module.exports = Orz
