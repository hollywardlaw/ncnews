const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topicCon');

topicsRouter.get('/', sendTopics);
topicsRouter.post('/', postTopic);

module.exports = topicsRouter;
