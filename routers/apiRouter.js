const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const articlesRouter = require('../routers/articlesRouter');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);

module.exports = apiRouter;
