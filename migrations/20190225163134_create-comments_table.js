exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author');
    commentsTable
      .foreign('author')
      .references('username')
      .on('users');
    commentsTable.integer('article_id');
    commentsTable
      .foreign('article_id')
      .references('article_id')
      .on('articles');
    commentsTable.integer('votes').defaultsTo(0);
    commentsTable.date('created_at').defaultsTo(knex.fn.now());
    commentsTable.text('body');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
