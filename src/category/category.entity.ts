import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post/post.entity";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    slug: string

    @Column('longtext')
    content: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: string

    @OneToMany(() => Post, (post) => post.category_id, { cascade: true })
    posts?: Post[]
}