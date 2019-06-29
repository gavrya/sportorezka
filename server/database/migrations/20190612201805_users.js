
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.collate('utf8_unicode_ci');

    table.increments();
    table.string('facebookId').notNullable().unique();
    table.text('facebookToken').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.text('avatarUrl').notNullable();
    table.bigInteger('createDate').unsigned().notNullable();
    table.bigInteger('updateDate').unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
