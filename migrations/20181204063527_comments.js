exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('comments', table => {
    table.integer('id');
    table.string('user');
    table.text('comment');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
