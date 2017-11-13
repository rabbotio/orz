const start = (schema, port = 3000) =>
  new Promise((resolve, reject) => {
    const express = require('express')
    const bodyParser = require('body-parser')
    const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')

    const app = express()

    app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

    app.listen(port, err => {
      if (err) return reject(err)
      resolve(app)
    })
  })

module.exports = { start }
