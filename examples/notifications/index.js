// Will listen for comments then publish notification

// Setup
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

// Connect
client.on('connect', () => {
  // Yeah!
  console.log('connected')

  // Listen
  client.subscribe('comment')

  // Echo
  client.on('message', (topic, message) => {
    console.log('notifications.get.topic:', topic)
    console.log('notifications.get.message:', message.toString())

    // Wait for 1 sec and echo
    setTimeout(() => {
      // Echo
      client.publish('notification', message.toString())
    }, 1000)
  })
})
