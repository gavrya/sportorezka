
exports.up = function (knex) {
  return knex.schema.createTable('participants', (table) => {
    table.increments();
    table.integer('userId').unsigned().notNullable();
    table.integer('eventId').unsigned().notNullable();
    table.bigInteger('createDate').unsigned().notNullable();

    table.unique(['userId', 'eventId']);

    table.foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.foreign('eventId')
      .references('id')
      .inTable('events')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('participants');
};
