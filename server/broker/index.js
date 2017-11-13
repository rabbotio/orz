module.exports = (app, config) => {
  var { Broker } = require('pigato')
  var conf = {
    broker: {
      host: 'tcp://127.0.0.1:55555'
    }
  }

  var broker = new Broker(conf.broker.host)
  broker.start()
}
