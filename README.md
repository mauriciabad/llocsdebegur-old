### Frontend

> Uses: `React JS`, `Next.js`, `Tailwind`, and `TypeScript`.
> Deployment: Deployed on `Vercel`.

Public URL: <https://llocs-de-begur.vercel.app/>

## Backend

> Uses: `Strapi`
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

CMS admin panel URL: <https://cms.llocsdebegur.s.mauriciabad.com/admin>

### Development

To run the code in local run:

```sh
docker compose -f docker-compose.yaml up -d --build
```

To run the code in production run:

```sh
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```
