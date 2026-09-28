# Book Inventory

## Set Up

Copy the example environment file to create your own `.env` file and install
the necessary dependencies.

```bash
cp .env.example .env
npm install
```

Set `JWT_SECRET` in `.env` to a long random value. Requests to `/books` must
include a Bearer JWT with an `admin` or `librarian` role.

## Development

Make sure you have set up your `.env` file before running the development
server.

```bash
npm run dev
```
