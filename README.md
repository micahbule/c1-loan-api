# Loan API

This is a simple API to manage loan applications

## Requirements

- [NodeJS](https://nodejs.org/en) (preferred v22+)
- [PNPM](https://pnpm.io/installation)
- [Docker](https://www.docker.com/)

## Project Setup

```bash
# install dependencies
$ pnpm install

# setup database container
$ docker-compose up -d

# run the migrations
$ pnpm run migrate:up
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Documentation

Go to `/api` to access the Swagger documentation.

## Run tests

```bash
# unit tests
$ pnpm run test
```

## Extras

- The `docker-compose.yml` file also comes with a [PGAdmin](https://www.pgadmin.org/) instance to browse the database accordingly. Default credentials are written in the file accordingly. You can use this to connect to the database using `db` as host.
