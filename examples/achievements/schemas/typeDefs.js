module.exports = `
type Query {
  getAchievements: String
}

type Mutation {
  setAchievement(value: String!): String
}

schema {
  query: Query
  mutation: Mutation
}
`
