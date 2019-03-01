const articlesRouter = require('express').Router();
const {
  sendArticles, postArticles, patchArticle, deleteArticle,
} = require('../controllers/articleCon');
const { sendCommentsByArticleID, postComment } = require('../controllers/commentCon');
const { handle405 } = require('../error handling/index');

articlesRouter.route('/')
  .get(sendArticles)
  .post(postArticles)
  .all(handle405);

articlesRouter.route('/:article_id')
  .get(sendArticles)
  .patch(patchArticle)
  .delete(deleteArticle);

articlesRouter.route('/:article_id/comments')
  .get(sendCommentsByArticleID)
  .post(postComment);


module.exports = articlesRouter;
