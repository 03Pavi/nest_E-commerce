import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../interfaces/user-repository-interface';
import { BcryptPasswordHasher } from './bcrypt-password-hasher.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    @Inject('IPasswordHasher') private readonly passwordHasher: BcryptPasswordHasher,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.passwordHasher.hashPassword(password);
    const createUserDtoWithHashedPassword = {
      ...rest,
      password: hashedPassword,
    };
    return this.userRepository.createUser(createUserDtoWithHashedPassword);
  }

  findAllUser(authorizationToken: string) {
    return this.userRepository.findAllUser(authorizationToken);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
