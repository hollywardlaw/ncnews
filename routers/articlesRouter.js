const articlesRouter = require('express').Router();
const { sendArticles } = require('../controllers/articleCon');
const { handle405 } = require('../error handling/index');


articlesRouter.get('/', sendArticles);
articlesRouter.all('/', handle405);

module.exports = articlesRouter;
