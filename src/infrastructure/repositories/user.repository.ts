import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) { super(User, dataSource.createEntityManager()); }
    async findByEmail(email: string): Promise<User> {
        return await this.findOneBy({ email });
    }
    async createUser(createUserDto: User): Promise<User> {
        return await this.save(createUserDto);
    }
    async findAllUser(): Promise<User[]> {
        return await this.find();
    }

}