import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { District } from "../district/district.entity";


@Entity()
export class Ward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => District, district => district.id)
    district_id: District;
}