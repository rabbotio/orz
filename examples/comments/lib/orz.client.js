class Client {
  constructor ({ host, service, logger = console }) {
    // Logger
    this.logger = logger

    // Service
    this.service = service

    // Client
    const { Client: PigatoClient } = require('pigato')
    this.client = new PigatoClient(host)

    // Capture error
    this.client.on('error', this.logger.error)
  }

  start () {
    this.client.start()
  }

  fetch (props) {
    return new Promise((resolve, reject) =>
      this.client.request(
        this.service,
        props, // Pass through props = { query, variables, operationName }
        null, // Partial data from rep.write not handle
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        },
        {
          timeout: 5000
        }
      )
    )
  }
}

module.exports = Client
