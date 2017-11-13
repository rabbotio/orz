module.exports = (app, config) => {
  const { Broker } = require('@rabbotio/rainbow')
  const broker = new Broker(config)
  broker.start()
}
