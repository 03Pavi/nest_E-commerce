import { DataSource, DataSourceOptions } from 'typeorm';
import { createDatabase, SeederOptions } from 'typeorm-extension';
import { ConfigService } from '@nestjs/config';
import { createDB } from 'src/infrastructure/database/connection/db_connection';
require('dotenv').config();

export const dataSourceOptions = (
    configService: ConfigService,
): DataSourceOptions & SeederOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: ['dist/src/domain/**/*.js'],
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: ['dist/src/infrastructure/database/migrations/*.js'],
    seeds: ['dist/src/infrastructure/database/seeders/*.js'],
    seedTracking: true,
});

// createDB().then(() => console.log('Database connection has been established successfully')).catch((err) => console.error("Unable to connect to the database:", err))
export const dataSource = new DataSource(
    dataSourceOptions(new ConfigService()),
);

dataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized successfully.');
    })
    .catch((error) => {
        console.error('Error during Data Source initialization:', error);
    })

