var amqp = require('amqplib/callback_api')

var args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Usage: rpc_client.js num')
  process.exit(1)
}

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) throw err

  conn.createChannel((err, ch) => {
    if (err) throw err

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err

      var corr = generateUuid()
      var num = parseInt(args[0])

      console.log(' [x] Requesting fib(%d)', num)

      ch.consume(
        q.queue,
        function (msg) {
          if (msg.properties.correlationId === corr) {
            console.log(' [.] Got %s', msg.content.toString())
            setTimeout(function () {
              conn.close()
              process.exit(0)
            }, 500)
          }
        },
        { noAck: true }
      )

      ch.sendToQueue('rpc_queue', Buffer.from(num.toString()), { correlationId: corr, replyTo: q.queue })
    })
  })
})

function generateUuid () {
  return Math.random().toString() + Math.random().toString() + Math.random().toString()
}
