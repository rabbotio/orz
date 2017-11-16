// Config
const brokerURI = 'tcp://0.0.0.0:9000'
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
const initAchievement = async () => {
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(brokerURI, 'achievements')
  return client.start()
}

// And other service
const initNotification = async () => {
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(brokerURI, 'notifications')
  return client.start()
}

const initAndFetch = async () => {
  // We'll init our service
  await init()
  await start()

  // init others service
  const achievement = await initAchievement()
  const notification = await initNotification()

  setInterval(
    // Every 3 sec.
    async () => {
      // And we'll try to set achievements
      await achievement.fetch({ query: `mutation { setAchievement(value: "ok") }` }).then(console.log).catch(console.error)
      // Then notify
      await notification.fetch({ query: `mutation { setNotification(value: "ok") }` }).then(console.log).catch(console.error)
    },
    3000
  )
}

initAndFetch()
