# Llocs de Begur app

## Frontend

> Uses: `React JS`, `Next.js`, `Tailwind`, and `TypeScript`.
> Deployment: Deployed on `Vercel`.

Public URL: <https://llocsdebegur.vercel.app/>

## Backend

> Uses: `Strapi`
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

CMS admin panel URL: <https://cms.llocsdebegur.s.mauriciabad.com/admin>

### Development

In order to make changes in the backend, do them locally and when everything works commit to master, then the code will be deployed to the server and you can start creating the new data there.

To run the code in local run:

```sh
docker compose -f docker-compose.yaml up -d --build
```

To run the code in production run:

```sh
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```
