module.exports = (app, { base_url }) =>
  new Promise((resolve, reject) => {
    // Graceful Shutdown Server
    const gracefulShutdown = (server, signal) => {
      console.log(`Received kill signal (${signal}), shutting down gracefully.`)
      server.close(() => {
        console.log('Closed out remaining connections.')
        process.exit()
      })
    }

    // Server
    const { URL } = require('url')
    const port = new URL(base_url).port
    const server = app.listen(port, err => {
      if (err) return reject(err)
      debug.info(`Express : ${base_url}`)
      resolve(server)
    })

    // Graceful server shutdown
    // listen for TERM signal .e.g. kill
    process.on('SIGTERM', () => {
      gracefulShutdown(server, 'SIGTERM')
    })

    // listen for TERM signal .e.g. Ctrl-C
    process.on('SIGINT', () => {
      gracefulShutdown(server, 'SIGINT')
    })
  })
