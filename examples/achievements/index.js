const start = async () => {
  // Config
  const baseURL = 'http://localhost:4003'
  const brokerURI = 'tcp://127.0.0.1:55555'
  const config = {
    service: 'achievements',
    graphqlURI: 'http://localhost:4003/graphql',
    brokerURI
  }

  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer({ schema, baseURL })
  await graphQLServer.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(config)
  worker.start()
}

start()
