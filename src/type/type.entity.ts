import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { Disease } from "../disease/disease.entity";

@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @ManyToMany(() => Disease, disease => disease.types)
    @JoinTable({
        name: 'disease_type',
        joinColumn: {
            name: 'type_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: "FK_Disease_Type"
        },
        inverseJoinColumn: {
            name: 'disease_id',
            referencedColumnName: 'id',
            foreignKeyConstraintName: "FK_Type_Disease"
        },
    })
    diseases?: Disease[]
}