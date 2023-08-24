import { env } from "@/lib/env";
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(env('GRAPHQL_API_URL'), {
  headers: {
    "x-api-key": env('GRAPHQL_API_KEY')
  }
})
