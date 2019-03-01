const connection = require('../db/connection');

exports.getCommentsByArticle_ID = article_id => connection.from('comments')
  .select('comments.*')
  .where({ article_id });
