require('../pre')

describe('authenticate()', () => {
  it('should authorize and return tokens', async () => {
    // Helper
    const qs = require('qs')

    // Server
    const osmos = require('../osmos')
    await osmos.start(require('./config'))

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

    const token_result = await fetch(`${oauth_token_url}?${queryToken}`)
    const token_json = await token_result.json()

    expect(token_json).toMatchObject({
      token_type: 'Bearer',
      expires_in: expect.any(String),
      access_token: expect.any(String),
      refresh_token: expect.any(String)
    })

    // #3 : token -> validate
    const api_test_url = `${base_url}/api/test/`
    const api_test_result = await fetch(`${api_test_url}`, { headers: { authorization: `Bearer ${token_json.access_token}` } })
    const api_test_json = await api_test_result.json()

    expect(api_test_json).toMatchObject({
      isValid: true
    })

    await osmos.stop()
  })
})
