import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../user/interfaces/user-repository.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) { }
  async signIn(email: string, pass: string): Promise<any> {
    console.log(this.userRepository)
    const user = await this.userRepository.findByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}