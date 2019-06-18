
exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.text('description').notNullable();
    table.bigInteger('createDate').unsigned().notNullable();
    table.bigInteger('updateDate').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
