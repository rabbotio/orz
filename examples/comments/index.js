// Config
const brokerURI = 'tcp://127.0.0.1:55555'
const baseURL = 'http://localhost:4002'

// Our service
const start = async () => {
  // GraphQL server
  const { GraphQLServer } = require('@rabbotio/rainbow')
  const schema = require('./schemas')
  const graphQLServer = new GraphQLServer({ schema, baseURL })
  await graphQLServer.start()

  // Worker
  const { Worker } = require('@rabbotio/rainbow')
  const worker = new Worker({
    service: 'comments',
    graphqlURI: `${baseURL}/graphql`,
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
