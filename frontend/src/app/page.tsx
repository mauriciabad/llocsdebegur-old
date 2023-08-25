import { graphqlClient } from "@/lib/graphql"
import { gql } from "graphql-request"

const queryGetAllBeaches = gql`
query{
  detailsBeaches {
    data {
      attributes {
        basicDetails {
          id
          name
          shortDescription
        }
      }
    }
  }
}
`

export default async function Home() {
  const beaches = await graphqlClient.request(queryGetAllBeaches) as any

  return (
    <main>
      <h1>Platjes</h1>
      <ul>
        {beaches.detailsBeaches.data.map(beach => <li key={beach.attributes.basicDetails.id}>{beach.attributes.basicDetails.name}</li>)}
      </ul>
    </main>
  )
}
