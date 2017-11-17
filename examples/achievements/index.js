const start = async () => {
  // Config
  const serviceName = 'achievements'
  const baseURL = 'http://localhost:4003'
  const brokerURI = 'tcp://0.0.0.0:9000'
  const graphqlURI = `${baseURL}/graphql`
  const secret = 'good morning teacher sit down'

  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer(baseURL, schema)
  await graphQLServer.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(brokerURI, serviceName, { secret })
  worker.initGraphQL(graphqlURI)
  await worker.start()
}

start()
