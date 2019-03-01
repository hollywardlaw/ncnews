const articlesRouter = require('express').Router();
const {
  sendArticles, postArticles, patchArticle, deleteArticle,
} = require('../controllers/articleCon');
const { sendCommentsByArticleID } = require('../controllers/commentCon');
const { handle405 } = require('../error handling/index');


articlesRouter.get('/', sendArticles);
articlesRouter.get('/:article_id', sendArticles);
articlesRouter.post('/', postArticles);
articlesRouter.patch('/:article_id', patchArticle);
articlesRouter.delete('/:article_id', deleteArticle);
articlesRouter.get('/:article_id/comments', sendCommentsByArticleID);
articlesRouter.all('/', handle405);


module.exports = articlesRouter;
