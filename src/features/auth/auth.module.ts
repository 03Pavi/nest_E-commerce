import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { ParseDateOptions } from '../user/pipes/parse-date.pipe';

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    {
      provide: 'IUserRepository',
      useValue: UserRepository
    },
    {
      provide: ParseDateOptions,
      useValue: {
        errMSG: "invalid timestamp"
      }
    }
  ],
})
export class AuthModule { }
