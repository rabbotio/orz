// Config
const brokerURI = 'tcp://127.0.0.1:9000'
const baseURL = 'http://localhost:4002'

// Our service
const init = async () => {
  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer(baseURL, schema)
  return graphQLServer.start().catch(console.error)
}

const start = async () => {
  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(brokerURI, 'comments')
  worker.initGraphQL(`${baseURL}/graphql`)
  return worker.start().catch(console.error)
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

const initAndFetch = async () => {
  // We'll init our service
  await init()
  await start()

  setInterval(
    // Every 3 sec.
    async () => {
      // And we'll try to set achievements
      await setAchievement()
      // Then notify
      await setNotification()
    },
    3000
  )
}

initAndFetch()
