const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
// const articlesRouter = require('../routers/articlesRouter');
// const commentsRouter = require('../routers/commentsRouter');
// const usersRouter = require('../routers/usersRouter');

apiRouter.use('/topics', topicsRouter);
// apiRouter.use('/articles', articlesRouter);
// apiRouter.use('/comments', commentsRouter);
// apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
