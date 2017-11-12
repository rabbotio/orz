const Worker = conf => {
  const { Worker } = require('pigato')
  const worker = new Worker(conf.broker.host, 'stock')
  worker.start()

  worker.on('error', err => {
    console.log('WORKER ERROR', err)
  })

  worker.on('request', (inp, rep) => {
    console.log('worker.inp:', inp)
    rep.write(JSON.stringify(inp))
    rep.end()
  })
}

module.exports = { Worker }
