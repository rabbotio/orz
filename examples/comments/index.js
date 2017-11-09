// Sender
const echo = (client, { roomID, userID, msg }) => {
  const payload = `${+new Date()}/${roomID}/${userID}/${msg}`
  console.log('echo:', payload)
  client.publish('comment', payload)
}

// Setup
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost')
let _index

// Connect
client.on('connect', () => {
  // Yeah!
  console.log('comment.connected')

  // Will comments every 3 sec
  _index && clearInterval(_index)
  _index = setInterval(
    () =>
      echo(client, {
        roomID: 'some_room_id',
        userID: '59f0579537d658654f0334f5',
        msg: 'Hello! :D'
      }),
    3000
  )
})
