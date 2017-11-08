require('../pre')

describe('authenticate()', () => {
  it('should authenticate the request', async () => {
    const nap = require('../nap')
    await nap.start(require('./config'))

    const { base_url } = require('./config')
    const authorize_url = `${base_url}/oauth/authorize`

    const query = require('qs').stringify({
      redirect_uri: base_url,
      response_type: 'code',
      client_id: 1,
      scope: 'profile'
    })

    console.log(`${authorize_url}/?${query}`)

    const result = await fetch(`${authorize_url}/?${query}`)

    const json = await result.json()
    console.log(json)

    expect(json).toMatchObject({
      redirectUri: expect.stringMatching(new RegExp(String.raw`http:\/\/localhost:3030\/\?scope=profile&expires_in=3600&code=`)),
      state: {
        redirect_uri: 'http://localhost:3030',
        response_type: 'code',
        client_id: '1',
        scope: ['profile']
      }
    })

    await nap.stop()
  })
})
