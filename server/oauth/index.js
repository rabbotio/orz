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

module.exports = init
