# Llocs de Begur app

## Frontend

> Uses: `React JS`, `Next.js`, `Tailwind`, and `TypeScript`.
>
> Deployment: Deployed on `Vercel`.

Public URL: <https://llocsdebegur.vercel.app/>

### Development

#### Local environment

To run the code locally:

```sh
cd frontend
npm i
npm run dev
```

App URL: <http://localhost:3000>

#### Production environment

To run the code in production:

```sh
cd frontend
npm i
npm run build
```

## Backend

> Uses: `Strapi`
>
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

CMS admin panel URL: <https://cms.llocsdebegur.s.mauriciabad.com/admin>

### Development

To make changes in the backend, do them locally and when everything works commit to master. Then, the code will be deployed automatically to the server and you can start creating the new data there.

#### Local environment

To run the code locally:

```sh
cd backend
docker compose -f docker-compose.yaml up --build
```

Admin URL: <http://localhost:1337/admin>

> Remember that you can export the admin's config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs export`. **You should do this manually when the config changes** (Admin role, User role, Core store, or I18n locale). And after deploying, manually importing the config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs import`

#### Production environment

To run the code in production run:

```sh
cd backend
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```
