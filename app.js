const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./routers/apiRouter');
const {
  handle404,
  handle400,
  handle422,
  handle500,
} = require('./error-handling/index');

app.use(cors());

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => next({ status: 404 }));

app.use(handle404);

app.use(handle400);

app.use(handle422);

app.use(handle500);

module.exports = app;
