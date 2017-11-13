let _notifications = []

const resolvers = {
  Query: {
    getNotifications: (root, _, context) => _notifications.join(',')
  },
  Mutation: {
    setNotification: (_, { bar }, context) => _notifications.push(bar)
  }
}

module.exports = resolvers
