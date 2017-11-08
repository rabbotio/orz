const init = () => {
  // Create a new Express application.
  const express = require('express')
  const app = express()

  // CORS
  const cors = require('cors')
  app.use(cors())

  // Helmet
  const helmet = require('helmet')
  app.use(helmet())

  // JSON
  const bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  // Static
  app.use(express.static('public'))

  return app
}

module.exports = init
