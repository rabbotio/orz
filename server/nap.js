let app
let server
let mongoose
module.exports = {
  start: async config => {
    // Init
    app = require('./express')()

    // Mongoose
    mongoose = await require('./model')(config).catch(err => debug.error(`MongoDB :`, err))

    // OAuth
    await require('./oauth')(app, config)

    // Server
    server = await require('./express/server')(app, config)

    // Route
    require('./routes')(app, config)

    // Ready
    const { version } = require('./package.json')
    debug.info(`NAP     : v${version} (${process.env.NODE_ENV}) is ready, enjoy! 🚀`) // eslint-disable-line
    return true
  },
  stop: async () => {
    await mongoose.disconnect()
    debug.info(`MongoDB : bye!`)

    await server.close()
    debug.info(`NAP     : bye!`)

    return true
  }
}
