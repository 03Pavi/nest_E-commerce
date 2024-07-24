import { User } from "src/domain/user/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findAllUser(): Promise<User[]>;
  findOneUser(id: number): Promise<User>;
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User>;
  removeUser(id: number): Promise<void>;
}
