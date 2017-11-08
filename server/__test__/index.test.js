require('../pre')

describe('authenticate()', () => {
  it('should authorize and return tokens', async () => {
    // Helper
    const qs = require('qs')

    // Server
    const nap = require('../nap')
    await nap.start(require('./config'))

    // Config
    const { base_url } = require('./config')
    const oauth_authorize_url = `${base_url}/oauth/authorize/`

    const queryCode = qs.stringify({
      redirect_uri: base_url,
      response_type: 'code',
      client_id: 1,
      scope: 'profile'
    })

    // #1 : redirect_uri -> code

    const result = await fetch(`${oauth_authorize_url}?${queryCode}`)
    const json = await result.json()

    expect(json).toMatchObject({
      redirectUri: expect.stringMatching(new RegExp(String.raw`http:\/\/localhost:3030\/\?scope=profile&expires_in=3600&code=`)),
      state: {
        redirect_uri: 'http://localhost:3030',
        response_type: 'code',
        client_id: '1',
        scope: ['profile']
      }
    })

    // #2 : code -> token
    const oauth_token_url = `${base_url}/oauth/token/`

    const queryToken = qs.stringify({
      grant_type: 'authorization_code',
      client_id: '1',
      client_secret: 'kittens',
      code: json.redirectUri.split('&code=')[1]
    })
    console.log(`${oauth_token_url}?${queryToken}`)
    const token_result = await fetch(`${oauth_token_url}?${queryToken}`)
    const token_json = await token_result.json()

    expect(token_json).toMatchObject({
      token_type: 'Bearer',
      expires_in: expect.any(Number),
      access_token: expect.any(String),
      refresh_token: expect.any(String)
    })

    await nap.stop()
  })
})
