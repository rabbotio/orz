const brokerURI = 'tcp://127.0.0.1:55555'

// Our service
const start = async () => {
  // Config
  const config = {
    service: 'comments',
    graphqlURI: 'http://localhost:4002/graphql',
    brokerURI
  }

  // GraphQL server
  const { Server } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const server = new Server({ schema, port: 4002 })
  await server.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker(config)
  worker.start()
}

// Other service
const setAchievement = async () => {
  // Client
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client({
    service: 'achievements',
    brokerURI
  })

  client.start()

  // Fetch
  const query = `mutation {
    setAchievement(value: "ok")
  }`
  const result = await client.fetch({ query }).catch(console.error)
  console.log(result)
  return result
}

// And other service
const setNotification = async () => {
  // Client
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client({
    service: 'notifications',
    brokerURI
  })

  client.start()

  // Fetch
  const query = `mutation {
    setNotification(value: "ok")
  }`
  const result = await client.fetch({ query }).catch(console.error)
  console.log(result)
  return result
}

// We'll start our service...
start()
  // And we'll try to set achievements
  .then(setAchievement)
  // Then notify
  .then(setNotification)
