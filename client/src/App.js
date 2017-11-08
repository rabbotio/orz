import * as React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

const QUERY = gql`
{
  resolveUserInfo(_id:"user.59f0579a37d658654f033527")
  {
    name
  }
}
`

const withService = graphql(QUERY)
export default withService(({ data }) => {
  const { loading, resolveUserInfo } = data
  if (loading) return <div>loading...</div>
  if (!resolveUserInfo) return <div>Forget to config <b>endpoint</b> at <b>package.json</b>?</div>

  return <p>{resolveUserInfo.name}</p>
})
