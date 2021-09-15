exports.up = function(knex) {
    return knex.schema
    .createTable("apikeys", (table) => {
        table.uuid('id').primary().notNullable().defaultTo(knex.raw('(UUID())')),
        table.string('uuid', 36).notNullable()
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("apikeys")
};