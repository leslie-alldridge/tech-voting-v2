exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('ideas', table => {
    table.increments('id');
    table.string('title');
    table.text('description');
    table.integer('votes');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ideas');
};
