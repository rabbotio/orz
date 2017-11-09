// Setup
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

// Connect
client.on('connect', () => {
  // Yeah!
  console.log('receivers.connected')

  // Listen
  client.subscribe('notification')

  // Debug
  client.on('message', (topic, message) => {
    console.log('receivers.get.topic:', topic)
    console.log('receivers.get.message:', message.toString())
  })
})
