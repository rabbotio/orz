const brokerURI = 'tcp://127.0.0.1:55555'

// Our service
const start = async () => {
  // GraphQL server
  const { Server } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const server = new Server({ schema, port: 4002 })
  await server.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker({
    service: 'comments',
    graphqlURI: 'http://localhost:4002/graphql',
    brokerURI
  })
  worker.start()
}

const { fetchOnce } = require('@rabbotio/rainbow')

// Other service
const setAchievement = async () =>
  fetchOnce({
    service: 'achievements',
    brokerURI,
    query: `mutation { setAchievement(value: "ok") }`
  })
    .then(console.log)
    .catch(console.error)

// And other service
const setNotification = async () =>
  fetchOnce({
    service: 'notifications',
    brokerURI,
    query: `mutation { setNotification(value: "ok") }`
  })
    .then(console.log)
    .catch(console.error)

// We'll start our service...
start()
  // And we'll try to set achievements
  .then(setAchievement)
  // Then notify
  .then(setNotification)
