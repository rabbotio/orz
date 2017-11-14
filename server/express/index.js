module.exports = async config => {
  const { GraphQLServer } = require('@rabbotio/rainbow')
  return new GraphQLServer(config)
}
