const connection = require('../db/connection');

exports.getCommentsByArticle_ID = (article_id, { sort_by = 'created_at', order = 'desc' }) => connection.from('comments')
  .select('comments.*')
  .where({ article_id })
  .orderBy(sort_by, order);

exports.addNewComment = (newComment, article_id) => {
  const commentToInsert = { ...newComment, article_id };
  return connection.from('comments').insert(commentToInsert).returning('*');
};

exports.updateComment = (comment_id, inc_votes = 0) => connection
  .from('comments')
  .where({ comment_id })
  .increment('votes', inc_votes)
  .returning('*');

exports.removeComment = comment_id => connection.from('comments').where({ comment_id }).del();
