import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from './interfaces/user-repository-interface';

@Injectable()
export class UserService {
  constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) { }
  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.createUser(createUserDto);
  }

  findAllUser(authorizationToken) {
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
