const { getCommentsByArticle_ID } = require('../models/commentMod');

exports.sendCommentsByArticleID = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  getCommentsByArticle_ID(article_id, { sort_by, order }).then((comments) => {
    res.status(200).send(comments);
  });
};
