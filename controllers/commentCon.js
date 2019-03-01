const { getCommentsByArticle_ID, addNewComment } = require('../models/commentMod');

exports.sendCommentsByArticleID = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  getCommentsByArticle_ID(article_id, { sort_by, order }).then((comments) => {
    res.status(200).send(comments);
  }).catch(next);
};

exports.postComment = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  addNewComment(newComment, article_id).then(([comment]) => {
    res.status(201).send({ comment });
  }).catch(next);
};
