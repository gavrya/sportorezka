
exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.collate('utf8_unicode_ci');

    table.increments();
    table.integer('userId').unsigned().notNullable();
    table.integer('categoryId').unsigned().notNullable();
    table.integer('locationId').unsigned().notNullable();
    table.text('description').notNullable();
    table.integer('minParticipants').unsigned();
    table.integer('maxParticipants').unsigned();
    table.integer('minAge').unsigned();
    table.integer('maxAge').unsigned();
    table.boolean('isReceptionActive').notNullable().defaultTo(true);
    table.bigInteger('confirmDate').unsigned().index();
    table.bigInteger('cancelDate').unsigned().index();
    table.bigInteger('startDate').unsigned().index();
    table.bigInteger('finishDate').unsigned().index();
    table.bigInteger('createDate').unsigned().notNullable();
    table.bigInteger('updateDate').unsigned().notNullable();

    table.index(['minParticipants', 'maxParticipants']);
    table.index(['minAge', 'maxAge']);
    table.index(['isReceptionActive']);

    table.foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.foreign('categoryId')
      .references('id')
      .inTable('categories')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');

    table.foreign('locationId')
      .references('id')
      .inTable('locations')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
