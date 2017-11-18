module.exports = `
type Query {
  getComments: String
}

type Mutation {
  setComment(value: String!): String
}

schema {
  query: Query
  mutation: Mutation
}
`
