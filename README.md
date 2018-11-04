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
