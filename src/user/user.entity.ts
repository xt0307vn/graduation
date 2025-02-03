import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Role } from "../role/role.entity";
import { Ward } from "../ward/ward.entity";
import { Post } from "../post/post.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    password: string;

    @Column({nullable: true, default: 'Khách hàng'})
    name: string;

    @Column()
    phone_number: string;

    @Column({nullable: true})
    email: string;

    @Column({type: 'datetime', nullable: true})
    dob: string;

    @Column({ default: true })
    status: boolean;

    @Column({ nullable: true })
    gender: number;

    @Column({ type: 'int', default: 2 })
    role_id: number;

    @ManyToOne(type => Role, role => role.users, { nullable: true})
    @JoinColumn({name: 'role_id'})
    role?: Role;

    // @ManyToOne(type => Ward, ward => ward.id)
    // ward_id: Ward;

    @OneToMany(type => Post, post => post.user_id)
    posts?: Post[]
}