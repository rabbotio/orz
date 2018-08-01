module.exports = `
type Query {
  getContents: String
}

type Mutation {
  setContent(value: String!): String
}

schema {
  query: Query
  mutation: Mutation
}
`
