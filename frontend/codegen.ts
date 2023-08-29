import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:1337/graphql',
  documents: 'src/**/*.tsx',
  generates: {
    'src/lib/gql/__generated__/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
