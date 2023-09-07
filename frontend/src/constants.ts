export const IS_PRODUCTION_ENV = process.env.NODE_ENV === 'production'

export const BACKEND_URL = IS_PRODUCTION_ENV
  ? 'https://cms.begur.s.mauri.app'
  : 'http://localhost:1337'
