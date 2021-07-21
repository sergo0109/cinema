import { SnakeNamingStrategy } from "./src/common/snake-naming.strategy";


module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsRun: true,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [__dirname + 'src/modules/**/*.entity{.ts,.js}'],
    migrations: [__dirname + 'src/migrations/*{.ts,.js}'],
    cli: {
        "migrationsDir": "db-migrations"
    }
};
