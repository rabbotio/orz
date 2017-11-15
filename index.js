require('./pre')

const config = require('./config')
const Orz = require('./orz')
new Orz(config).start()
