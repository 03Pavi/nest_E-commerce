import { ConfigService } from "@nestjs/config";
import { DataSourceOptions } from "typeorm";
import { createDatabase } from "typeorm-extension";

export const createDB = async () => {
    const configService = new ConfigService();
    const CREATE_DB = configService.get<string>('CREATE_DB');
    const options: DataSourceOptions = {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        
    };
    if (CREATE_DB) {
        createDatabase({
            ifNotExist: true,
            options
        })

    };
}
