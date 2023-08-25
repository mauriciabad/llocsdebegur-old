const ENV_DEFAULTS = {
  GRAPHQL_API_KEY: null, // Login in strapi admin, go to settings and generate a new key
  GRAPHQL_API_URL: 'http://localhost:1337'
} as const

type EnvValidKey = keyof typeof ENV_DEFAULTS

export function env(name: EnvValidKey): string {
  if (process.env.NODE_ENV === 'production') {
    const value = process.env[name]
    if (value === undefined) throw new Error(`Missing environment variable ${name}. You are running in production and didn't create the propper .env file. Create the propper .env file, check the README.md about how to do so.`)
    return value
  } else {
    const envValue = process.env[name]
    const defaultValue = ENV_DEFAULTS[name]
    const value = envValue ?? defaultValue
    if (!value) throw new Error(`Missing environment variable ${name}. You are running in development and didn't create the propper .env file.`)
    return value
  }
}