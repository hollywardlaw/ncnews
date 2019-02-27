const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topicCon');
const { handle405 } = require('../error handling/index');

topicsRouter.get('/', sendTopics);
topicsRouter.post('/', postTopic);
topicsRouter.all('/', handle405);

module.exports = topicsRouter;
