const connection = require('../db/connection');

exports.getArticles = () => connection
  .select('articles.*')
  .count({ comment_count: 'comment_id' })
  .from('articles')
  .leftJoin('comments', 'comments.article_id', 'articles.article_id')
  .groupBy('articles.article_id');

// SELECT articles.*, COUNT(comment_id) AS comment_count FROM articles
// JOIN comments ON comments.article_id = articles.article_id
// GROUP BY articles.article_id;
