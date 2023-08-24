# Llocs de Begur app

## Frontend

> Uses: `React JS`, `Next.js`, `Tailwind`, and `TypeScript`.
>
> Deployment: Deployed on `Vercel`.

Public URL: <https://llocsdebegur.vercel.app/>

## Backend

> Uses: `Strapi`
>
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

CMS admin panel URL: <https://cms.llocsdebegur.s.mauriciabad.com/admin>

### Development

To make changes in the backend, do them locally and when everything works commit to master. Then, the code will be deployed automatically to the server and you can start creating the new data there.

To run the code in local run:

```sh
cd backend
docker compose -f docker-compose.yaml up --build
```

To run the code in production run:

```sh
cd backend
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```
