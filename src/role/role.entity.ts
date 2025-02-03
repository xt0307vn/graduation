import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, (user) => user.role)
    users: User[]
}