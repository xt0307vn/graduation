import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}