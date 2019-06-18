
exports.up = async function (knex) {
  await knex.schema.createTable('skillLevels', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
  });

  return knex('skillLevels').insert([
    { name: 'ANY' },
    { name: 'BEGINNER' },
    { name: 'AMATEUR' },
    { name: 'AVDANCED' },
  ]);
};

exports.down = function (knex) {
  return knex.schema.dropTable('skillLevels');
};
