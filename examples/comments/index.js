const start = async () => {
  // Provide GraphQL server
  const server = require('./lib/server.js')
  const schema = require('./schemas')
  await server.start(schema, 4001)

  // Provide RPC service
  const Worker = require('./lib/orz.worker')
  const worker = new Worker({
    service: 'comments',
    graphqlURI: 'http://localhost:4001/graphql',
    brokerURI: 'tcp://127.0.0.1:55555'
  })
  worker.start()
}

start()
