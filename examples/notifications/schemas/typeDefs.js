module.exports = `
type Query {
  getNotifications: String
}

type Mutation {
  setNotification(value: String!): String
}

schema {
  query: Query
  mutation: Mutation
}
`
