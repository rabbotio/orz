// Sender
const echo = (client, { roomID, userID, msg }) => {
  const payload = `${+new Date()}/${roomID}/${userID}/${msg}`
  console.log('echo:', payload)
  client.publish('comment', payload)
}

// Setup
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')

// Connect
client.on('connect', () => {
  // Yeah!
  console.log('connected')

  // Will comments every 1 sec
  setInterval(
    () =>
      echo(client, {
        roomID: 'some room',
        userID: '59f0579537d658654f0334f5',
        msg: 'Hello! :D'
      }),
    1000
  )
})
