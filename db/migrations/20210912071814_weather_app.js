exports.up = function(knex) {
    return knex.schema
    .createTable("cities", (table) => {
        table.uuid('id').primary().notNullable().defaultTo(knex.raw('(UUID())')),
        table.string('name', 16).unique().notNullable()
    })
    .createTable('weather_stations', (table) => {
        table.uuid('id').primary().notNullable().defaultTo(knex.raw('(UUID())')),
        table.string('name', 16).notNullable(),
        table.float('latitude').notNullable(),
        table.float('longitude').notNullable(),
        table.uuid('city_id').notNullable().references("id").inTable("cities").onDelete("CASCADE"),
        table.string("stationId", 16).unique()
    })
    .createTable('weather_records', (table) => {
        table.uuid('id').primary().notNullable().defaultTo(knex.raw('(UUID())')),
        table.uuid('weather_station_id').notNullable().references("id").inTable("weather_stations").onDelete("CASCADE"),
        table.datetime("created_at").notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.string('weather_element_str', 2048)
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable("weather_records").dropTable("weather_stations").dropTable("cities")
};
