
exports.up = async function (knex) {
  await knex.schema.createTable('eventStatuses', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });

  return knex('eventStatuses').insert([
    { name: 'CREATED' },
    { name: 'STARTED' },
    { name: 'FINISHED' },
    { name: 'CANCELLED' },
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable('eventStatuses');
};
