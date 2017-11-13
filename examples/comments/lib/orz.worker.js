const Worker = config => {
  // Worker
  const { Worker } = require('pigato')
  const worker = new Worker(config.broker.host, config.service)
  worker.start()

  worker.on('error', err => {
    console.log('WORKER ERROR', err)
  })

  worker.on('request', (inp, rep) => {
    console.log('worker.inp:', inp)

    // GraphQL
    const { createApolloFetch } = require('apollo-fetch')
    const uri = `http://localhost:4001/graphql`
    const apolloFetch = createApolloFetch({ uri })

    const { query, variables, operationName } = inp
    apolloFetch({ query, variables, operationName })
      .then(result => {
        // const { data, errors, extensions } = result
        rep.write(JSON.stringify(result))
        rep.end()
      })
      .catch(err => {
        rep.write(JSON.stringify(err))
        rep.end()
      })
  })

  return worker
}

module.exports = { Worker }
