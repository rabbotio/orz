module.exports = (app, { port }) => {
  // Oauth Route
  require('../oauth').route(app)
}
