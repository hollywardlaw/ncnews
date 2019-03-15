const topicsRouter = require('express').Router();
const { sendTopics, postTopic } = require('../controllers/topicCon');
const { handle405 } = require('../error-handling/index');

topicsRouter.route('/')
  .get(sendTopics)
  .post(postTopic)
  .all(handle405);

module.exports = topicsRouter;
