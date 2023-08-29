export default ({ env }) => {
  return [
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        origin: env('NODE_ENV') === 'production' ?
          [
            'https://llocsdebegur.mauriciabad.com',
            'https://llocsdebegur.vercel.app',
          ] : [
            'http://localhost:3000',
            'http://localhost:1337'
          ],
      },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ]
}
