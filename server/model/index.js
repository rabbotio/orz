const init = async ({ mongodb_uri }) => {
  debug.info(`MongoDB : ${mongodb_uri}`)

  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise

  // Debug
  mongoose.connection.on('connected', () => debug.info(`MongoDB :`, 'Connection Established'))
  mongoose.connection.on('reconnected', () => debug.info(`MongoDB :`, 'Connection Reestablished'))
  mongoose.connection.on('disconnected', () => debug.info(`MongoDB :`, 'Connection Disconnected'))
  mongoose.connection.on('close', () => debug.info(`MongoDB :`, 'Connection Closed'))
  mongoose.connection.on('error', err => debug.error(`MongoDB :`, err))

  await mongoose.connect(mongodb_uri, {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })

  return mongoose
}

module.exports = init
