# Testing and Building Endpoints

## connection.js

First off, we can create a `connection.js` file: before the knex CLI created this object when we ran the seed script. However, we can actually create the connection object ourselves:

```js
const dbConfig = require('../knexfile.js');
const knex = require('knex');

const connection = require('knex');

module.exports = connection;
```

- Here we are accessing the config for the database
- Requiring in the knex module and invoking it with the config
- This will create an object with a bunch of functions for querying the DB

## Setting up tests

Now we can set up a test script `app.spec.js` in order to start building our API.

- The first thing we do here is set our environment to 'test' - this will ensure we are pointing to the test DB as we will export the test config from `knexfile.js`

```js
process.env.NODE_ENV = 'test';
const app = require('../app');

const request = require('supertest')(app);

const { expect } = require('chai');

describe('/api', () => {
  describe('/houses', () => {
    it('GET status:200 - serves up an array of house objects', () => {
      return request.get('/api/houses').expect(200);
    });
  });
});
```

- All our test does at the moment is check for status 200: in other words, all we need to pass this test is a route and a controller that will respond with the correct status code.

## Mocha Hooks

Before we run each test we want to make sure that the database is rolled back and re-seeded.
This is because in some of our tests we could be doing CRUD operations like POST, PATCH and PUT requests - these requests will change the data and may cause later tests to break. Indeed if we keep running the tests it becomes very difficult to track all the changes we make to the database.

- We can take advantage of a mocha beforeEach hook that will execute a function **BEFORE** every `it` block in our test. In this case, we can tear down our database tables and then re-seed our database before every it block, ensuring we have the same data before the start of every test.

```js
const connection = require('../db/connection');

describe('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe('/houses', () => {
    it('GET status:200 responds with an array of house objects', () => {
      // assertion here
    });
  });
});
```

## Building Endpoints

Now we can build our controller in `/controllers/houses.js`

```js
exports.sendHouses = (req, res, next) => {
  res.status(200).send({});
};
```

- This should pass our test as we are responding with the correct status code! Now we can make our test a little more ambitious - lets check we can respond with an array of film objects.

```js
it('GET status:200 - serves up houses', () => {
  return request
    .get('/api/houses')
    .expect(200)
    .then(res => {
      expect(res.body.houses).to.be.an('array');
      expect(res.body.houses[0]).to.contain.keys(
        'house_id',
        'house_name',
        'founder',
        'animal',
      );
    });
});
```

Now the function `sendHouses` is a controller so ultimately it will have to invoke some other **model** function. The model function will directly interface with the db: in other words, the model will query the database and retrieve some data for us. Then afterwards the controller will respond with the data that the model gives us.

```js
const { getHouses } = require('../models/houses');

exports.sendHouses = (req, res, next) => {
  getHouses().then(houses => {
    res.status(200).send({ houses });
  });
};
```

Now we can start to implement our model `getHouses`

```js
const connection = require('../db/connection');

exports.getHouses = () => {
  return connection.select('*').from('houses');
};
```

This will pass our test at the moment as we are just responding with 200 and an array of all the films from our DB. Each row in the postgreSQL database will be turned into an object by `knex`.

## More Complex Queries

What other features can we test for knext? It could be useful to know how many wizards are in each house. Unfortunately knex / SQL gives counts as a string, so our test could look something like this:

```js
it('GET status:200 - each house has a wizard_count', () => {
  return request
    .get('/api/houses')
    .expect(200)
    .then(res => {
      expect(res.body.houses[0].wizard_count).to.be.a('String');
    });
});
```

If we want to access to the number of wizards are in each house, we will need to access information in the other table. We can do this using a `JOIN`. We can then use an aggregate function `COUNT`, to get count each student. We use `GROUP BY` to ensure we don't get duplicate rows back from the query. First, try it out in raw SQL:

```sql
SELECT houses.*, COUNT(wizard_id) AS wizard_count FROM houses
JOIN wizards ON wizards.house_id = houses.house_id
GROUP BY houses.house_id;
```

Now we need to do a JOIN in our model, using `knex` syntax. We can find useful examples of knex syntax in the Query Builder section [here](https://knexjs.org/#Builder)
So we can further build our model by chaining the `.join()` method:

```js
exports.getHouses = () => {
  return connection
    .select('houses.*')
    .count({ wizard_count: 'wizard_id' })
    .from('houses')
    .join('wizards', 'wizards.house_id', 'houses.house_id')
    .groupBy('houses.house_id');
};
```

### Some hints:

- One problem you may face, is that you cannot delete something like an `article` easily. Why? Because other entries in other DBs use its ID as a foreign key. In this case, you might want to add this to your migrations, to save you from sending 2 delete requests:

```js
wizardsTable
  .integer('house_id')
  .references('houses.house_id')
  .unsigned()
  .onDelete('CASCADE');
```

- One annoying thing about `knex`, is that it always returns results - even when you expect one thing back, in an array. You should destructure these arrays to make sure you're sending back an object, rather than an array with a single item.
