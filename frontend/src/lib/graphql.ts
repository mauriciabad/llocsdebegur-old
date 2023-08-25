import { GraphQLClient } from 'graphql-request'

const GRAPHQL_API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cms.llocsdebegur.s.mauriciabad.com/graphql'
    : 'http://localhost:1337/graphql'

export const graphqlClient = new GraphQLClient(GRAPHQL_API_URL)
