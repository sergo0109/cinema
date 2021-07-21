import { Module } from '@nestjs/common';

import { UserModule } from "./modules/user/user.module";
import { CinemaModule } from "./modules/cinema/cinema.module";
import { MovieModule } from "./modules/movie/movie.module";
import { SessionModule } from "./modules/session/session.module";
import { ReservationModule } from "./modules/reservation/reservation.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { SnakeNamingStrategy } from "./common/snake-naming.strategy";



// @ts-ignore
@Module({
    imports: [
        UserModule,
        CinemaModule,
        MovieModule,
        SessionModule,
        ReservationModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(<string>process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            autoLoadEntities: true,
            namingStrategy: new SnakeNamingStrategy(),
            entities: ['modules/**/*.entity{.ts,.js}'],
            migrations: ['migrations/*{.ts,.js}'],
            cli: {
                migrationsDir: 'src/migrations'
            },
        })
    ]})
export class AppModule{}
