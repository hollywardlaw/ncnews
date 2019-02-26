const articlesRouter = require('express').Router();
const { sendArticles } = require('../controllers/articleCon');

articlesRouter.get('/', sendArticles);

module.exports = articlesRouter;
