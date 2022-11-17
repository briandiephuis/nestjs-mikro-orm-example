## Minimal NestJS Mikro-ORM app

### Setup

1. Start a Postgres DB:

```
docker run -d \
  --name test_db \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=test_password \
  -e POSTGRES_USER=test_user \
  -e POSTGRES_DB=test_db \
  postgres:14.6-alpine3.16
```

1. Install dependencies (with 5.5.2)

```sh
npm install
```

## Verify everything works on 5.5.2

```sh
npm start
```

Test that it works:

```sh
$ curl localhost:8000/users
[{"id":1,"name":"Hayley Zieme"},{"id":2,"name":"Mina Watsica"},{"id":3,"name":"Aaliyah Champlin"},{"id":4,"name":"Eliza Zulauf"},{"id":5,"name":"Caesar Feil"},{"id":6,"name":"Audrey Hyatt"},{"id":7,"name":"Christy Howell"},{"id":8,"name":"Ezekiel Ortiz"},{"id":9,"name":"Graciela Weber"},{"id":10,"name":"Kallie Stamm"}]
```

Run (integration) test(s), which succeed

```sh
npm test

> mikro-orm-example@1.0.0 test
> jest --forceExit

 PASS  src/modules/user/user.e2e-spec.ts
  UserController (e2e)
    ✓ should return seeded users on: /users (GET) (33 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        7.231 s
Ran all test suites.
```

## Switch to 5.5.3

Stop the app and update dependencies:

```sh
npm i --save-exact @mikro-orm/cli@5.5.3 @mikro-orm/core@5.5.3 @mikro-orm/migrations@5.5.3 @mikro-orm/postgresql@5.5.3 @mikro-orm/reflection@5.5.3 @mikro-orm/seeder@5.5.3
```

Run app again

```sh
npm start
```

Should still work:

```sh
$ curl localhost:8000/users
[{"id":1,"name":"Hayley Zieme"},{"id":2,"name":"Mina Watsica"},{"id":3,"name":"Aaliyah Champlin"},{"id":4,"name":"Eliza Zulauf"},{"id":5,"name":"Caesar Feil"},{"id":6,"name":"Audrey Hyatt"},{"id":7,"name":"Christy Howell"},{"id":8,"name":"Ezekiel Ortiz"},{"id":9,"name":"Graciela Weber"},{"id":10,"name":"Kallie Stamm"}]
```

But tests fail:

```sh
$ npm test

> mikro-orm-example@1.0.0 test
> jest --forceExit

 FAIL  src/modules/user/user.e2e-spec.ts
  ● UserController (e2e) › should return seeded users on: /users (GET)

    DriverException: database "test_user" does not exist

      34 |
      35 |   // THIS SEEMS TO GO WRONG
    > 36 |   await initOrm.getMigrator().up();
         |   ^
```

## Command to switch back to 5.5.2

```sh
npm i --save-exact @mikro-orm/cli@5.5.2 @mikro-orm/core@5.5.2 @mikro-orm/migrations@5.5.2 @mikro-orm/postgresql@5.5.2 @mikro-orm/reflection@5.5.2 @mikro-orm/seeder@5.5.2
```
