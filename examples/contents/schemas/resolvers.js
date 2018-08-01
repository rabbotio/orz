let _contents = []

const resolvers = {
  Query: {
    getContents: (root, _, context) => _contents.join(',')
  },
  Mutation: {
    setContent: (_, { bar }, context) => _contents.push(bar)
  }
}

module.exports = resolvers
