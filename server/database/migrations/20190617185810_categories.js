
exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.collate('utf8_unicode_ci');

    table.increments();
    table.string('name').notNullable().unique();
    table.bigInteger('createDate').unsigned().notNullable();
    table.bigInteger('updateDate').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('categories');
};
