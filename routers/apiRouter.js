const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const articlesRouter = require('../routers/articlesRouter');
const usersRouter = require('../routers/usersRouter');

const jsonObj = { '/api/topics': { GET: '', POST: '' } };
// get request / apirouter.get
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
