class Client {
  constructor ({ host, service, logger = null }) {
    const { Client } = require('pigato')
    this.service = service
    this.client = new Client(host)
    this.client.on('error', console.error)
  }

  start () {
    this.client.start()
  }

  fetch ({ query }) {
    return new Promise((resolve, reject) => {
      this.client.on('error', err => {
        console.log('CLIENT ERROR', err)
        reject(err)
      })

      const res = this.client.request(
        this.service,
        {
          query
        },
        null, // Partial data from rep.write not handle
        (err, data) => {
          if (err) reject(err)
          resolve(data)
        },
        {
          timeout: 5000
        }
      )
    })
  }
}

module.exports = Client
