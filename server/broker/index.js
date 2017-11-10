module.exports = (app, config) => {
  var amqp = require('amqplib/callback_api')

  amqp.connect('amqp://localhost:5672', (err, conn) => {
    if (err) throw err

    conn.createChannel((err, ch) => {
      if (err) throw err

      var q = 'rpc_queue'

      ch.assertQueue(q, { durable: false })
      ch.prefetch(1)
      console.log(' [x] Awaiting RPC requests')
      ch.consume(q, function reply (msg) {
        var n = parseInt(msg.content.toString())

        console.log(' [.] fib(%d)', n)

        var r = fibonacci(n)

        ch.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), { correlationId: msg.properties.correlationId })

        ch.ack(msg)
      })
    })
  })

  function fibonacci (n) {
    if (n === 0 || n === 1) return n
    else return fibonacci(n - 1) + fibonacci(n - 2)
  }

  /*
  require('./sniff')(aedes)

  server.on('ready', () => {
    require('./authen')(server)
    require('./authorize')(server)

    debug.info(`Aedes   : Ready!`)
  })
  */
}
