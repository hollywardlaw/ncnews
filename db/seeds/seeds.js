const {
  topicData, userData, articleData, commentData,
} = require('../data');
const {
  getDate,
  createRef,
  replaceTitlesWithID,
  createAuthor,
} = require('../../utils');

exports.seed = (knex, Promise) => knex.migrate
  .rollback()
  .then(() => knex.migrate.latest())
  .then(() => knex
    .insert(topicData)
    .into('topics')
    .returning('*')
    .then(() => knex
      .insert(userData)
      .into('users')
      .returning('*')
      .then(() => {
        const formattedArticleData = getDate(articleData);
        return knex
          .insert(formattedArticleData)
          .into('articles')
          .returning('*')
          .then((articleRows) => {
            const articleRefs = createRef(
              articleRows,
              'title',
              'article_id',
            );
            const commentsWithArticleIDs = replaceTitlesWithID(
              commentData,
              articleRefs,
              'belongs_to',
              'article_id',
            );
            const commentsWithAuthors = createAuthor(
              commentsWithArticleIDs,
            );
            const formattedCommentData = getDate(commentsWithAuthors);
            return knex
              .insert(formattedCommentData)
              .into('comments')
              .returning('*');
          });
      })));
