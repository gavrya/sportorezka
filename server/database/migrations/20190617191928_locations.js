
exports.up = function (knex) {
  return knex.schema.createTable('locations', (table) => {
    table.increments();
    table.integer('userId').unsigned().notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable();
    table.decimal('gpsLat', 10, 8).notNullable();
    table.decimal('gpsLng', 11, 8).notNullable();
    table.bigInteger('createDate').unsigned().notNullable();
    table.bigInteger('updateDate').unsigned().notNullable();

    table.index(['gpsLat', 'gpsLng']);

    table.foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('locations');
};
