let _achievements = []

const resolvers = {
  Query: {
    getAchievements: (root, _, context) => _achievements.join(',')
  },
  Mutation: {
    setAchievement: (_, { bar }, context) => _achievements.push(bar)
  }
}

module.exports = resolvers
