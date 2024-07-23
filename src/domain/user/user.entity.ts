import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './enums/role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column({ unique: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column()
    password: string;
    @Column({ type: "enum", enum: Role, default: 'user' })
    role: Role;
    @Column()
    address: string

}
