// Provide GraphQL server
const server = require('./lib/server.js')
const schema = require('./schemas')
server.start(schema, 4001)

// Provide RPC service
const config = {
  service: 'comments',
  broker: {
    host: 'tcp://127.0.0.1:55555'
  }
}
require('./lib/orz.worker').Worker(config)

// test
const { Client } = require('pigato')
const client = new Client(config.broker.host)
client.start()

client.on('error', function (err) {
  console.log('CLIENT ERROR', err)
})

const query = `{
  getFoo(bar:"ok") 
}`

setTimeout(() => {
  console.log('request.start')
  const res = client.request(
    config.service,
    {
      query
    },
    { timeout: 90000 }
  )

  let body = ''
  res
    .on('data', data => {
      body += data
      console.log('client.data:', data)
    })
    .on('end', () => {
      console.log('request.end')
    })
}, 3000)
