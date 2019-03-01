const connection = require('../db/connection');

exports.getCommentsByArticle_ID = (article_id, { sort_by = 'created_at', order = 'desc' }) => connection.from('comments')
  .select('comments.*')
  .where({ article_id })
  .orderBy(sort_by, order);

exports.addNewComment = (newComment, article_id) => {
  newComment.article_id = article_id;
  return connection.from('comments').insert(newComment).returning('*');
};
