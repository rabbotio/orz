let _users = []

const resolvers = {
  Query: {
    getUsers: (root, _, context) => _users.join(',')
  },
  Mutation: {
    setUser: (_, { bar }, context) => _users.push(bar) && bar
  }
}

module.exports = resolvers
