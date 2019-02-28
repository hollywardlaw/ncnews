const articlesRouter = require('express').Router();
const { sendArticles, postArticles } = require('../controllers/articleCon');
const { handle405 } = require('../error handling/index');


articlesRouter.get('/', sendArticles);
articlesRouter.get('/:article_id', sendArticles);
articlesRouter.post('/', postArticles);
articlesRouter.all('/', handle405);


module.exports = articlesRouter;
