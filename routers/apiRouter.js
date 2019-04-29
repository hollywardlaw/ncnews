const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const articlesRouter = require('../routers/articlesRouter');
const usersRouter = require('../routers/usersRouter');
const { sendEndpoints } = require('../controllers/endpointsCon');

apiRouter.route('/').get(sendEndpoints);

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
