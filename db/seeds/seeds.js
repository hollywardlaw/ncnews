const { topicData, userData, articleData, commentData } = require('../data');
const { getDate } = require('../../utils');

exports.seed = (knex, Promise) =>
  knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex
        .insert(topicData)
        .into('topics')
        .returning('*')
        .then(() =>
          knex
            .insert(userData)
            .into('users')
            .returning('*')
            .then(() => {
              const formattedArticleData = getDate(articleData);
              return knex
                .insert(formattedArticleData)
                .into('articles')
                .returning('*')
                .then(articleRows => {
                  const formattedCommentData = getDate(commentData);
                  return knex
                    .insert(formattedCommentData)
                    .into('comments')
                    .returning('*');
                });
            })
        )
    );
