const start = async () => {
  const brokerURI = 'tcp://127.0.0.1:9000'

  const { Broker } = require('@rabbotio/rainbow')
  const broker = new Broker(brokerURI)
  return broker.start().catch(console.error)
}

start()
