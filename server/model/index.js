const init = async ({ mongodbURI }) => {
  if (!mongodbURI) return

  console.info(`MongoDB  : ${mongodbURI}`)

  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise

  // Debug
  mongoose.connection.on('connected', () => console.info(`MongoDB  :`, 'Connection Established'))
  mongoose.connection.on('reconnected', () => console.info(`MongoDB  :`, 'Connection Reestablished'))
  mongoose.connection.on('disconnected', () => console.info(`MongoDB  :`, 'Connection Disconnected'))
  mongoose.connection.on('close', () => console.info(`MongoDB  :`, 'Connection Closed'))
  mongoose.connection.on('error', err => console.error(`MongoDB  :`, err))

  await mongoose.connect(mongodbURI, {
    useMongoClient: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })

  return mongoose
}

module.exports = init
