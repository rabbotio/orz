import * as React from 'react'
import { render } from 'react-dom'

import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'

import App from './App'

const nap_graphql_uris = {
  local: 'http://localhost:3001/graphql'
}

const client = new ApolloClient({
  link: new HttpLink({ uri: nap_graphql_uris.local }),
  cache: new InMemoryCache().restore({})
})

const ApolloApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(ApolloApp, document.getElementById('root'))
