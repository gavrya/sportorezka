
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('facebook_id').notNullable().unique();
    table.text('facebook_token').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.text('avatar_url');
    table.string('phone_number');
    table.timestamp('create_date').notNullable().defaultTo(knex.fn.now());
    table.timestamp('update_date').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
