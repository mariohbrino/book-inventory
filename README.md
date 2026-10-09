# Book Inventory

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
