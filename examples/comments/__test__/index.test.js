/* eslint-env jest */

describe('worker()', () => {
  it('should able to fetch GraphQL', async () => {
    // Config
    const config = {
      service: 'comments',
      graphqlURI: 'http://localhost:4001/graphql',
      brokerURI: 'tcp://127.0.0.1:55555'
    }

    // Provide GraphQL server
    const server = require('../lib/server.js')
    const schema = require('../schemas')
    await server.start(schema, 4001)

    // Provide RPC service
    const Worker = require('../lib/orz.worker')
    const worker = new Worker(config)
    worker.start()

    // Client
    const Client = require('../lib/orz.client')
    const client = new Client(config)
    client.start()
    const query = `{
      getFoo(bar:"ok") 
    }`

    // Fetch
    const result = await client.fetch({ query }).catch(console.error)
    expect(JSON.parse(result)).toMatchObject({ data: { getFoo: 'Hello ok , Please login' } })
  })
})
