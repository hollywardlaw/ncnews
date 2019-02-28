const connection = require('../db/connection');

exports.getArticles = ({
  author, topic, sort_by = 'created_at', order = 'desc',
}) => {
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
  return articleQuery;
};

exports.addNewArticle = article => connection('articles').insert(article).returning('*');
