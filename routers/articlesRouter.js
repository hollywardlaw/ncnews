const articlesRouter = require('express').Router();
const { sendArticles, postArticles, patchArticle } = require('../controllers/articleCon');
const { handle405 } = require('../error handling/index');


articlesRouter.get('/', sendArticles);
articlesRouter.get('/:article_id', sendArticles);
articlesRouter.post('/', postArticles);
articlesRouter.patch('/:article_id', patchArticle);
articlesRouter.all('/', handle405);


module.exports = articlesRouter;
