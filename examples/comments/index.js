// Config
const brokerURI = 'tcp://127.0.0.1:55555'
const baseURL = 'http://localhost:4002'

// Our service
const start = async () => {
  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer(baseURL, schema)
  await graphQLServer.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(brokerURI, 'comments')
  worker.withGraphQL(`${baseURL}/graphql`)
  await worker.start()
}

// Other service
const setAchievement = async () => {
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(brokerURI, 'achievements')
  await client.start()

  return client.fetch({ query: `mutation { setAchievement(value: "ok") }` }).then(console.log).catch(console.error)
}

// And other service
const setNotification = async () => {
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(brokerURI, 'notifications')
  await client.start()

  return client.fetch({ query: `mutation { setNotification(value: "ok") }` }).then(console.log).catch(console.error)
}

// We'll start our service...
start()
  // And we'll try to set achievements
  .then(setAchievement)
  // Then notify
  .then(setNotification)
