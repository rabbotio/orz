class Worker {
  constructor ({ host, service, logger = null }) {
    // Worker
    const { Worker: PigatoWorker } = require('pigato')
    this.worker = new PigatoWorker(host, service)

    this.worker.on('error', err => {
      logger ? logger.error(err) : console.error(err)
    })

    this.worker.on('request', (inp, rep) => {
      console.log('worker.inp:', inp)

      // GraphQL
      const { createApolloFetch } = require('apollo-fetch')
      const uri = `http://localhost:4001/graphql`
      const apolloFetch = createApolloFetch({ uri })

      const { query, variables, operationName } = inp
      apolloFetch({ query, variables, operationName })
        .then(result => {
          // const { data, errors, extensions } = result
          rep.end(JSON.stringify(result))
        })
        .catch(err => {
          rep.end(JSON.stringify(err))
        })
    })
  }

  start () {
    this.worker.start()
  }
}

module.exports = Worker
