const start = (schema, port = 3000) => {
  const express = require('express')
  const bodyParser = require('body-parser')
  const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

  const app = express()

  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: schema }))
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  app.listen(port)
}

module.exports = { start }
