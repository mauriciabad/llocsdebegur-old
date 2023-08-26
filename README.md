# Llocs de Begur app

## Frontend

> Uses: `React JS`, `Next.js`, `Tailwind`, and `TypeScript`.
>
> Deployment: Deployed on `Vercel`.

Public URL: <https://llocsdebegur.mauriciabad.com/>

### Development

Check the [TODO.md](./TODO.md) file to pick a task to develop if you're unsure about what to do.

#### Local environment

To run the code locally:

```sh
cd frontend
npm i
npm run dev
```

- App URL: <http://localhost:3000>

#### Production environment

To run the code in production:

```sh
cd frontend
npm i
npm run build
```

- Vercel's project URL: <https://vercel.com/mauriciabad/llocsdebegur>

## Backend

> Uses: `Strapi`, `GraphQL`, `Docker`
>
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

- Admin panel URL: <https://cms.llocsdebegur.s.mauriciabad.com/admin>
- GraphQL URL: <http://cms.llocsdebegur.s.mauriciabad.com/graphql>

### Development

Check the [TODO.md](./TODO.md) file to pick a task to develop if you're unsure about what to do.

To make changes in the backend, do them locally and when everything works commit to master. Then, the code will be deployed automatically to the server and you can start creating the new data there.

You need a `.env` file, ask @mauriciabad to get it.

#### Local environment

To run the code locally:

```sh
cd backend
npm i
npm run docker:dev
```

- Admin panel URL: <http://localhost:1337/admin>
- GraphQL URL: <http://localhost:1337/graphql>

> Remember that you can export the admin's config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs export`. **You should do this manually when the config changes** (Admin role, User role, Core store, or I18n locale). And after deploying, manually importing the config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs import` on the server's docker container.

#### Production environment

To run the code in production run:

```sh
cd backend
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```
