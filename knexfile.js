const dotenv = require("dotenv")
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "3306";
const DATABASE_USER = process.env.DATABASE_USER || "root";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "root_password";
const DATABASE_NAME = process.env.DATABASE_NAME || "plataforma_db";

// console.log(DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD);
const knexConfig = {

    client: 'mysql',
    connection: {
        host: DATABASE_HOST,
        port: DATABASE_PORT,
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    },

    migrations: {
        tableName: 'knex_migrations',
        directory: './knex/migrations'
    },
    // Crear una nueva migración:
    // knex migrate:make <nombre_migracion>

    seeds: { // El seeds te define la data inicial que va a tener la tabla.
        tableName: 'knex_seeds',
        directory: './knex/seeds',
    }
    // Creare una nueva seed (Data inicial):
    // knex seed:make <nombre_seed>

    /*

    client: 'sqlite3',
    connection: {
        filename: 'database2.sqlite'
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './migrations'
    },
    seeds: {
        tableName: 'knex_seeds',
        directory: './seeds',
    }
    */
}

module.exports = knexConfig;

