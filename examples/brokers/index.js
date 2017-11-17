const start = async () => {
  const brokerURI = 'tcp://0.0.0.0:9000'

  const { Broker } = require('@rabbotio/rainbow')
  const broker = new Broker(brokerURI)
  return broker.start()
}

start().catch(console.error)
