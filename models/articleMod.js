const connection = require('../db/connection');

exports.getArticles = ({
  author, topic, sort_by = 'created_at', order = 'desc',
}, article_id) => {
  const articleQuery = connection
    .select('articles.*')
    .count({ comment_count: 'comment_id' })
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order);
  if (author) {
    articleQuery.where({ 'articles.author': author });
  }
  if (topic) {
    articleQuery.where({ 'articles.topic': topic });
  }
  if (article_id) {
    articleQuery.where({ 'articles.article_id': article_id });
  }
  return articleQuery;
};

exports.addNewArticle = article => connection('articles').insert(article).returning('*');

exports.updateArticle = (article_id, inc_votes) => connection
  .from('articles')
  .where({ 'articles.article_id': article_id })
  .increment('votes', inc_votes)
  .returning('*');

exports.removeArticle = article_id => connection.from('articles').where({ article_id }).del();
