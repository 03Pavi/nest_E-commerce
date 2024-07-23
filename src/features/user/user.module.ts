import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { User } from 'src/domain/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptPasswordHasher } from './services/bcrypt-password-hasher.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    { provide: 'IPasswordHasher', useClass: BcryptPasswordHasher },
  ],
  exports: [UserService],
})
export class UserModule {}
