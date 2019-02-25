const { topicData, userData } = require('../data');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex
        .insert(topicData)
        .into('topics')
        .returning('*')
        .then(() => {
          return knex
            .insert(userData)
            .into('users')
            .returning('*');
        });
    });
};
