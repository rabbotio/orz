class Worker {
  constructor ({ host, service, graphqlURI: uri, logger = console }) {
    // Logger
    this.logger = logger

    // Worker
    const { Worker: PigatoWorker } = require('pigato')
    this.worker = new PigatoWorker(host, service)

    // Capture error
    this.worker.on('error', this.logger.error)

    this.worker.on('request', (inp, rep) => {
      this.logger.log('worker.inp:', inp)

      // GraphQL
      const { createApolloFetch } = require('apollo-fetch')
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
