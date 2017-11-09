const authorizePublish = (client, topic, payload, callback) => {
  // TODO : Use scope
  const auth = true
  // set auth to :
  //  true to allow
  //  false to deny and disconnect
  //  'ignore' to puback but not publish msg.
  callback(null, auth)
}

const authorizeSubscribe = (client, topic, callback) => {
  // TODO : Use scope
  const auth = true
  // set auth to :
  //  true to allow
  //  false to deny
  callback(null, auth)
}

module.exports = server => {
  server.authorizePublish = authorizePublish
  server.authorizeSubscribe = authorizeSubscribe
}
