module.exports = server => {
  server.on('error', function (err) {
    console.log(err)
  })

  server.on('clientConnected', function (client) {
    console.log('Client Connected \t:= ', client.id)
  })

  server.on('published', function (packet, client) {
    console.log('Published :=', packet)
  })

  server.on('subscribed', function (topic, client) {
    console.log('Subscribed :=', client.packet)
  })

  server.on('unsubscribed', function (topic, client) {
    console.log('unsubscribed := ', topic)
  })

  server.on('clientDisconnecting', function (client) {
    console.log('clientDisconnecting := ', client.id)
  })

  server.on('clientDisconnected', function (client) {
    console.log('Client Disconnected     := ', client.id)
  })
}
