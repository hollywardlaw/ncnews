const { getCommentsByArticle_ID } = require('../models/commentMod');

exports.sendCommentsByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  getCommentsByArticle_ID(article_id).then((comments) => {
    res.status(200).send(comments);
  });
};
