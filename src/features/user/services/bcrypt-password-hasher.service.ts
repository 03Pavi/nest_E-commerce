// src/modules/users/services/bcrypt-password-hasher.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from 'src/features/user/interfaces/password-hasher.interface';
import { SALT_ROUNDS } from 'src/infrastructure/common/constant';

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }
}
