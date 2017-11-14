const init = async ({ mongodbURI, logger = console }) => {
  logger.info(`MongoDB  : ${mongodbURI}`)

  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise

  // Debug
  mongoose.connection.on('connected', () => logger.info(`MongoDB  :`, 'Connection Established'))
  mongoose.connection.on('reconnected', () => logger.info(`MongoDB  :`, 'Connection Reestablished'))
  mongoose.connection.on('disconnected', () => logger.info(`MongoDB  :`, 'Connection Disconnected'))
  mongoose.connection.on('close', () => logger.info(`MongoDB  :`, 'Connection Closed'))
  mongoose.connection.on('error', err => logger.error(`MongoDB  :`, err))

  await mongoose.connect(mongodbURI, {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })

  return mongoose
}

module.exports = init
