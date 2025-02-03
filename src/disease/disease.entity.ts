import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from "typeorm";
import { Type } from "../type/type.entity";

@Entity()
export class Disease {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column('longtext')
    overview: string;

    @Column({type: 'nvarchar', default: ''})
    image: string;

    @Column('longtext')
    symptoms: string;

    @Column('longtext')
    causes: string;

    @Column('longtext')
    treatment_methods: string;

    @Column('longtext')
    disease_prevention: string;

    @Column('longtext')
    risk_factors: string;

    @Column('longtext')
    diagnosis: string;

    @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    created_at: string;

    @ManyToMany(type => Type, type => type.diseases, {onUpdate: "CASCADE", onDelete: "CASCADE"})
    @JoinColumn({name: 'disease_id'})
    types?: Type[]
}