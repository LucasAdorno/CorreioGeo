exports.up = function(knex) {
  return knex.schema.createTable('crimes', function (table) {
    table.string('enderecodb');
    table.string('bairrodb');
    table.string('cidadedb');
    table.string('nome');
    table.string('sexo');
    table.string('idade');
    table.string('data');
    table.string('hora');
    table.string('latitude');
    table.string('longitude');
    table.string('estado');
    table.string('cidade');
    table.string('bairro');
    table.string('rua');
    table.string('crime_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('crimes')
};
