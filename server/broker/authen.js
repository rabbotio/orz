module.exports = (client, username, password, callback) => {
  // TODO : read from FB
  callback && callback(null, username === 'foo' && password.toString() === 'bar')
}
