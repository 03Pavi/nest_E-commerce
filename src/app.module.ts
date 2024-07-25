import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './features/user/user.module';
import { ProductModule } from './features/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from 'ormconfig';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './infrastructure/common/constant';
import { AuthModule } from './features/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './features/user/exceptions/app-exception-filter';
import { UserAgentMiddware } from './concepts/middlewares/user-agent.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => dataSourceOptions(configService),
      inject: [ConfigService],
    }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  // providers: [{
  //   provide: APP_FILTER,
  //   useClass: AppExceptionFilter
  // }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(UserAgentMiddware).forRoutes({
    //   path: "*",
    //   method: RequestMethod.ALL
    // }) //for all the routes 
  }
}
