
exports.up = function (knex) {
  return knex.schema.createTable('locationCategory', (table) => {
    table.increments();
    table.integer('locationId').unsigned().notNullable();
    table.integer('categoryId').unsigned().notNullable();

    table.unique(['locationId', 'categoryId']);

    table.foreign('locationId')
      .references('id')
      .inTable('locations')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.foreign('categoryId')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('locationCategory');
};
