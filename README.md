# Strapi example

This example deploys self-hosted version of [Strapi](https://strapi.io/). Internally it uses a PostgreSQL database to store the data.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/strapi?referralCode=milo)

## ✨ Features

- Strapi
- Postgres

## 💁‍♀️ How to use

- Click the Railway button 👆
- Add the required environment variables:
  - `APP_KEYS`: A comma-separated list of at least one secret key (e.g., `key1,key2,key3,key4`)
    - You can generate these with: `openssl rand -base64 32` (run 4 times for 4 keys)
  - `DATABASE_URL`: Automatically provided by Railway if you add a PostgreSQL service
    - Or manually set: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`
  - `JWT_SECRET`: A secret key for JWT tokens (generate with: `openssl rand -base64 32`)
  - `ADMIN_JWT_SECRET`: A secret key for admin JWT tokens (generate with: `openssl rand -base64 32`)
  - `API_TOKEN_SALT`: A salt for API tokens (generate with: `openssl rand -base64 32`)
  - `TRANSFER_TOKEN_SALT`: A salt for transfer tokens (generate with: `openssl rand -base64 32`)
- Media will automatically be persisted between deploys!

## 💻 Developing locally

When developing locally this Strapi template will connect to the Postgres server from its public [TCP Proxy](https://docs.railway.app/deploy/exposing-your-app#tcp-proxying)

- Enable the feature flag `Template Service Eject` in the [Feature Flags](https://railway.app/account/feature-flags) menu
- Within the service settings of the Strapi service click the `Eject` button on the upstream repository
- Clone that newly created repository locally
- Install Strapi's dependencies with `yarn install` or `npm install`
- Install the Railway CLI
    - Instructions for that can be found [here](https://docs.railway.app/develop/cli#installation)
    - If this is your first time using the CLI make sure to login with `railway login`
- Within the local repository run `railway link` to link the local repository to the Strapi service on Railway
- Start Strapi for development with `railway run yarn run develop` or `railway run npm run develop`
    - This command will run Strapi in development mode with the service variables available locally
- Open your browser to `http://127.0.0.1:1337/admin`

## 📝 Notes

- After your app is deployed, visit the `/admin` endpoint to create your admin user.
- If you want to use npm with this project make sure you delete the `yarn.lock` file after you have ran `npm install`