import { IS_PRODUCTION_ENV } from '@/constants';
import { BACKEND_URL } from '@/constants';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

if (IS_PRODUCTION_ENV) {
  loadDevMessages();
  loadErrorMessages();
}

const GRAPHQL_API_URL = `${BACKEND_URL}/graphql` as const

export const graphqlClient = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: GRAPHQL_API_URL
  }),
  cache: new InMemoryCache(),
});
