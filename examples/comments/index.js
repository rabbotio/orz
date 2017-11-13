// Provide GraphQL server
const server = require('./lib/server.js')
const schema = require('./schemas')
server.start(schema, 4001)

// Provide RPC service
const config = {
  service: 'comments',
  graphqlURI: `http://localhost:4001/graphql`,
  broker: {
    host: 'tcp://127.0.0.1:55555'
  }
}
const Worker = require('./lib/orz.worker')
const worker = new Worker({
  host: config.broker.host,
  service: config.service,
  graphqlURI: config.graphqlURI
})
worker.start()

// Test call
const Client = require('./lib/orz.client')
const client = new Client({ host: config.broker.host, service: config.service })
client.start()
const query = `{
  getFoo(bar:"ok") 
}`

setInterval(() => {
  console.log('request.start')
  client.fetch({ query }).then(console.log).catch(console.error)
}, 3000)
