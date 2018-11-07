# node-heroku

A simple node server to figure out if automated service testing is possible using a real database.

## Usage

To run the tests continuously - add more code, and the tests run automatically

```bash
npm run testwatch
```
If everything works, you should see something like this:
```
  Service Test
    When the universe is empty
      ? Everything should be ok
    Given I am not logged in
      When I request a URL that doesn't exist
        ? It should return status 404
      When I request the homepage
        ? It should return the homepage
      When I request a list of elements
        ? It should return status 503
    Given I am authorised
      When I request a list of elements
        ? It should return an empty list of elements
      When I add an element
        ? Should return the added element
        When there is an existing element
          ? Should return the element in an array

  7 passing (505ms)
```

## Description

- server.js - the server
- /app - the server routes and models
- /test/testZero - the test

You'll need postgres running locally. The database and table gets created by the test.

The database is created using node-heroku-test.sql

## Database Migration

I've included a simple example using db-migration - https://db-migrate.readthedocs.io

The migrations/ folder includes an example that adds a function called 'add' when you migrate 'up', or removes it when you migrate 'down'. To run the migration:

```$ node_modules/db-migrate/bin/db-migrate up```

This adds the function 'add' to the database specified in database.json

To reverse the process:

```$ node_modules/db-migrate/bin/db-migrate down```

### Creating a migration

I have SQL code that I want to use, so I create an empty migration:

```$ node_modules/db-migrate/bin/db-migrate create add-function-add --sql-file```

This creates several files in the migrations folder:
migrations/YYYYMMDDHHmmSS-add-function-add.js
migrations/sql/
  YYYYMMDDHHmmSS-add-function-add-up.sql
  YYYYMMDDHHmmSS-add-function-add-down.sql

Because I already have SQL for creating and deleting my function, I paste the CREATE FUNCTION SQL code into the add-up.sql file, and the DROP FUNCTION code into the add-down.sql file.

Then run the migration:

```$ node_modules/db-migrate/bin/db-migrate up```

Take a look in your database, and you'll see a new function 'add'. You'll also see a table called 'migrations' which shows the current state of migrations. This enables db-migrate to go forward (up) or backwards (down)