const start = async () => {
  // Config
  const config = {
    service: 'achievements',
    graphqlURI: 'http://localhost:4003/graphql',
    brokerURI: 'tcp://127.0.0.1:55555'
  }

  // GraphQL server
  const { Server } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const server = new Server({ schema, port: 4003 })
  await server.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(config)
  worker.start()
}

start()
