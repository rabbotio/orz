// Config
const brokerURI = 'tcp://0.0.0.0:9000'
const baseURL = 'http://localhost:4002'
const secret = 'good morning teacher sit down'

// Our service
const init = async () => {
  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer(baseURL, schema)
  return graphQLServer.start()
}

const start = async () => {
  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(brokerURI, 'comments')
  worker.initGraphQL(`${baseURL}/graphql`)
  return worker.start()
}

// Other service
const initClient = async () => {
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(brokerURI, { secret })
  return client.start()
}

const initAndFetch = async () => {
  // We'll init our service
  await init()
  await start()

  // Then init client
  const client = await initClient()

  setInterval(
    // Every 3 sec.
    async () => {
      // And we'll try to set achievements
      await client.fetch('achievements', { query: `mutation { setAchievement(value: "ok") }` }).then(console.log).catch(console.error)
      // Then notify
      await client.fetch('notifications', { query: `mutation { setNotification(value: "ok") }` }).then(console.log).catch(console.error)
    },
    3000
  )
}

initAndFetch()
