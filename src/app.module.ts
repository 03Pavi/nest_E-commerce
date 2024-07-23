import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/user/user.module';
import { ProductModule } from './features/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from 'ormconfig';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
