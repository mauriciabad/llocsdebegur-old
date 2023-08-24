const ENV_DEFAULTS = {
  GRAPHQL_API_KEY: 'any-key-works',
  GRAPHQL_API_URL: 'http://localhost:1337/graphql'
} as const

type EnvValidKey = keyof typeof ENV_DEFAULTS

export function env(name: EnvValidKey): string {
  if (process.env.NODE_ENV === 'production') {
    const value = process.env[name]
    if (value === undefined) throw new Error(`Missing environment variable ${name}. You are running in production and didn't create the propper .env file. Create the propper .env file, check the README.md about how to do so.`)
    return value
  } else {
    return ENV_DEFAULTS[name]
  }
}