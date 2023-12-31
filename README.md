# Llocs de Begur app

## Frontend

> [!NOTE]
> Uses: `React JS`, `Next.js`, `Apollo GraphQL`, `Tailwind`, and `TypeScript`.
>
> Deployment: Deployed on `Vercel`.

Public URL: <https://begur-old.mauri.app/>

### Development

Check the [TODO.md](./TODO.md) file to pick a task to develop if you're unsure about what to do.

#### Local environment

To run the code locally:

```sh
# Run the backend first or it will crash

cd frontend
npm i
npm run dev
```

> [!WARNING]
> Becaure of `codegen`, the backend needs to be running locally.
>
> If you plan to not update any GraphQL query, you don't need to run the backend, simply run `npm run dev:next`. Otherwise, you have to run the backend.

- App URL: <http://localhost:3000>

#### Production environment

To run the code in production:

```sh
cd frontend
npm i
npm run build
```

- Vercel's project URL: <https://vercel.com/mauriciabad/llocsdebegur-old>

## Backend

> [!NOTE]
> Uses: `Strapi`, `GraphQL`, `Docker`
>
> Deployment: Deployed on Maurici's server automatically when there's a push in main.

- Admin panel URL: <https://cms.begur-old.s.mauri.app/admin>
- GraphQL URL: <http://cms.begur-old.s.mauri.app/graphql>

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

> [!IMPORTANT]
> *Importing data*
> You can import all the data from production using `npm run strapi -- transfer --from https://cms.begur-old.s.mauri.app/admin`, then you provide a token. More info in <https://docs.strapi.io/dev-docs/data-management/transfer#setup-and-run-the-data-transfer>
>
> Remember that you can export the admin's config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs export`. **You should do this manually when the config changes** (Admin role, User role, Core store, or I18n locale). And after deploying, manually importing the config with the plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) or `npm run cs import` on the server's docker container.

#### Production environment

To run the code in production run:

```sh
cd backend
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build
```

> [!IMPORTANT]
> Remember to sync the settings changed during development by going to <https://cms.begur-old.s.mauri.app/admin/settings/config-sync> and import the settings. You have to do this after every deploy that changed something in the backend.
