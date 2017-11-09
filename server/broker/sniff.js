module.exports = ades => {
  ades.on('client', client => console.log('# new Client connects'))
  ades.on('clientDisconnect', client => console.log('# Client disconnects'))
  ades.on('clientError', (client, err) => console.log('# Client disconnects'))
  ades.on('keepaliveTimeout', client => console.log('# Client keep alive times out'))
  ades.on('publish', (packet, client) => console.log('# new packet is published:', packet.payload.toString()))
  ades.on('ack', (packet, client) => console.log('# packet published to a client is delivered successfully with QoS 1 or QoS 2'))
  ades.on('ping', (packet, client) => console.log('# Client sends a ping'))
  ades.on('subscribe', (subscriptions, client) => console.log('# client sends a SUBSCRIBE'))
  ades.on('unsubscribe', (unsubscriptions, client) => console.log('# client sends a UNSUBSCRIBE'))
  ades.on('connackSent', client => console.log('# CONNACK packet is sent to a client Client'))
  ades.on('closed', client => console.log('# the broker is closed'))
}
