import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column({type: 'nvarchar', default: ''})
    image: string;

    @Column()
    tags: string;

    @Column()
    indication: string;

    @Column()
    dosage_form: string;

    @Column()
    active_ingredient: string;

    @Column({type: "longtext"})
    content: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: string;
}