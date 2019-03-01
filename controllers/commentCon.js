const {
  getCommentsByArticle_ID, addNewComment, updateComment, removeComment,
} = require('../models/commentMod');

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

exports.patchComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateComment(comment_id, inc_votes).then(([comment]) => {
    res.status(200).send({ comment });
  }).catch(next);
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.sendStatus(204);
  }).catch(next);
};
