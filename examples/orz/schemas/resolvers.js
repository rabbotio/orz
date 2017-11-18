let _comments = []

const resolvers = {
  Query: {
    getComments: (root, _, context) => _comments.join(',')
  },
  Mutation: {
    setComment: (_, { bar }, context) => _comments.push(bar)
  }
}

module.exports = resolvers
