import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn, Index } from "typeorm";
import { User } from "../user/user.entity";
import { Category } from "../category/category.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({type: 'nvarchar', default: ''})
    image: string;

    @Column({ type: "longtext"})
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string;

    @ManyToOne(type => User, user => user.posts, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn({ name: 'user_id' })
    user_id: User

    @Column({ type: "int"})
    category_id: number;

    @ManyToOne(type => Category, category => category.id, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn({ name: 'category_id' })
    category?: Category
}