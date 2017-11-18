const config = require('./config')

const start = async () => {
  const Orz = require('../../')
  const orz = new Orz()
  await orz.init(config)
  await orz.start()
}

start().catch(console.error)
