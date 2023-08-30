export default ({ env }) => {
  return [
    "strapi::errors",
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          directives: {
            "frame-src": [
              "http://localhost:*",
              "self",
              "sandbox.embed.apollographql.com",
            ],
          },
        },
      },
    },
    {
      name: "strapi::cors",
      config: {
        origin:
          env("NODE_ENV") === "production"
            ? [
                "https://cms.llocsdebegur.s.mauriciabad.com",
                "https://llocsdebegur.mauriciabad.com",
                "https://llocsdebegur.vercel.app",
              ]
            : ["http://localhost:3000", "http://localhost:1337"],
      },
    },
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
