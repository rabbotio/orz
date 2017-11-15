const init = (app, { secret }) =>
  new Promise((resolve, reject) => {
    const ExpressOAuthServer = require('express-oauth-server')

    const model = require('./model')

    app.oauth = new ExpressOAuthServer({
      debug: true,
      model,
      /*
      If false, an error response will be rendered by this component.
      Set this value to true to allow your own express error handler to handle the error.
      */
      useErrorHandler: false,
      /*
      The authorize() and token() middlewares will both render their result to the response
      and end the pipeline. next() will only be called if this is set to true.
      */
      continueMiddleware: true
    })

    /*
    app.use(app.oauth.authenticate())

    app.use((req, res) => {
      res.send('Secret area')
    }) */

    return resolve(app)
  })

const supportedScopes = ['profile', 'status', 'avatar'],
  expiresIn = 3600,
  OAuthServer = require('./authServer'),
  services = require('./services'),
  oauthServer = new OAuthServer(
    services.clientService,
    services.tokenService,
    services.authorizationService,
    services.membershipService,
    expiresIn,
    supportedScopes
  )

function authorize (request, response) {
  oauthServer.authorizeRequest(request, 'accountid', function (error, authorizationResult) {
    if (error) {
      response.statusCode = 400
      return response.end(JSON.stringify(error))
    }

    // var code = require('url').parse(authorizationResult.redirectUri, true).query.code;
    // response.statusCode = 302;
    // response.setHeader('Location', 'http://localhost:8080/oauth/token?client_id=1&grant_type=authorization_code&client_secret=kittens&code=' + code);

    response.end(JSON.stringify(authorizationResult))
  })
}

function grantToken (request, response) {
  oauthServer.grantAccessToken(request, function (error, token) {
    if (error) {
      response.statusCode = 400
      return response.end(JSON.stringify(error))
    }

    response.end(JSON.stringify(token))
  })
}

function apiEndpoint (request, response) {
  oauthServer.validateAccessToken(request, function (error, validationResult) {
    if (error) {
      response.statusCode = 401
      return response.end(JSON.stringify(error))
    }

    response.end(JSON.stringify(validationResult))
  })
}

const route = app => {
  app.use('/oauth/authorize', authorize)
  app.use('/oauth/token', grantToken)
  app.use('/api/test', apiEndpoint)
}

module.exports = { init, route }
