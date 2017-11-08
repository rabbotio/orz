require('../pre')

describe('authenticate()', () => {
  it('should authenticate the request', async () => {
    const nap = require('../nap')
    await nap.start(require('../config'))

    const { base_url } = require('../config')
    const result = await fetch(base_url, {
      method: 'POST',
      headers: {
        authorization: 'Bearer foobar'
      }
    })

    const text = await result.text()
    expect(text).toEqual('Secret area')

    await nap.stop()
  })
})
