const start = async () => {
  // Config
  const config = {
    service: 'comments',
    graphqlURI: 'http://localhost:4001/graphql',
    brokerURI: 'tcp://127.0.0.1:55555'
  }

  // Client
  const { Client } = require('@rabbotio/rainbow')
  const client = new Client(config)
  client.start()

  // Fetch
  const query = `{
    getFoo(bar:"ok") 
  }`
  const result = await client.fetch({ query }).catch(console.error)
  console.log('result:', result)
}

start()
