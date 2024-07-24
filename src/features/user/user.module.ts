import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { User } from 'src/domain/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptPasswordHasher } from './services/bcrypt-password-hasher.service';
import { UserAgentMiddware } from 'src/concepts/middlewares/user-agent.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IPasswordHasher', useClass: BcryptPasswordHasher },
  ],
  exports: [UserService],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddware).exclude({
      method:RequestMethod.GET,
      path: '/users'
    }).forRoutes({
      method: RequestMethod.POST,
      path: '/users',
    })
  }
}