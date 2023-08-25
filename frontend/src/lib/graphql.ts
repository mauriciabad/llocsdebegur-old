import { env } from "@/lib/env";
import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(env('GRAPHQL_API_URL'))
