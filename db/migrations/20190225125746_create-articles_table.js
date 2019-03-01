exports.up = function (knex, Promise) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultsTo(0);
    articlesTable.string('topic');
    articlesTable
      .foreign('topic')
      .references('slug')
      .on('topics');
    articlesTable.string('author');
    articlesTable
      .foreign('author')
      .references('username')
      .on('users');
    articlesTable.date('created_at').defaultsTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('articles');
};
