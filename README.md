# Book Inventory

A RESTful API for managing a book inventory system, built with Node.js,
Express, and MongoDB (Mongoose). It manages four collections — authors, books,
users, and loans — with full CRUD operations, data validation, error handling,
OAuth authentication, unit and feature tests, and interactive Swagger
documentation.

## Live Links

- **Render (live API):** https://book-inventory-v6qb.onrender.com
- **API Documentation (Swagger):** https://book-inventory-v6qb.onrender.com/api-docs

## Tech Stack

- Node.js + Express
- MongoDB with Mongoose
- Zod for request validation
- Auth0 / OAuth for authentication
- Swagger (swagger-autogen + swagger-ui-express) for documentation
- Vitest for testing

## Set Up

Copy the example environment file to create your own `.env` file and install
the necessary dependencies.

```bash
cp .env.example .env
npm install
```

## Development

Make sure you have set up your `.env` file before running the development
server.

```bash
npm run dev
```

Check code style with the following command:

```bash
npm run lint
npm run format
```

Apply automatic code formatting with the following command:

```bash
npm run format:fix
npm run lint:fix
```

## Testing

The project includes several test scripts to ensure code quality and functionality.
You can run all tests, unit tests, feature tests, or generate a test coverage
report using the commands below.

```bash
npm run test
npm run test:units
npm run test:features
npm run test:coverage
```

Filter and hide skipped tests for feature tests using the following command:

```bash
npm run test:features -- -t "can fetch" --hideSkippedTests
```

## Authentication

This API uses OAuth for authentication. Routes that modify data (POST, PUT,
DELETE) and all of the user routes require an authenticated session.

- `GET /auth/login` — sign in with OAuth
- `GET /auth/logout` — sign out

Once signed in, the session grants access to the protected routes.

## API Endpoints

All endpoints return JSON. Validation errors return a `400` status code and
server errors return a `500` status code. The POST, PUT and DELETE routes
require authentication.

### Authors

| Method | Route          | Description          | Auth |
|--------|----------------|----------------------|------|
| GET    | /authors       | Get all authors      | No   |
| GET    | /authors/:id   | Get a single author  | No   |
| POST   | /authors       | Create a new author  | Yes  |
| PUT    | /authors/:id   | Update an author     | Yes  |
| DELETE | /authors/:id   | Delete an author     | Yes  |

### Books

| Method | Route        | Description        | Auth |
|--------|--------------|--------------------|------|
| GET    | /books       | Get all books      | No   |
| GET    | /books/:id   | Get a single book  | No   |
| POST   | /books       | Create a new book  | Yes  |
| PUT    | /books/:id   | Update a book      | Yes  |
| DELETE | /books/:id   | Delete a book      | Yes  |

### Users

| Method | Route        | Description        | Auth |
|--------|--------------|--------------------|------|
| GET    | /users       | Get all users      | Yes  |
| GET    | /users/:id   | Get a single user  | Yes  |
| POST   | /users       | Create a new user  | Yes  |
| PUT    | /users/:id   | Update a user      | Yes  |
| DELETE | /users/:id   | Delete a user      | Yes  |

### Loans

| Method | Route        | Description        | Auth |
|--------|--------------|--------------------|------|
| GET    | /loans       | Get all loans      | No   |
| GET    | /loans/:id   | Get a single loan  | No   |
| POST   | /loans       | Create a new loan  | Yes  |
| PUT    | /loans/:id   | Update a loan      | Yes  |
| DELETE | /loans/:id   | Delete a loan      | Yes  |