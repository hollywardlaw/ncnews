const connection = require('../db/connection');

exports.getArticles = (author) => {
  const articleQuery = connection
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id');
  if (author) {
    articleQuery.where({ 'articles.author': author });
  }
  return articleQuery;
};
