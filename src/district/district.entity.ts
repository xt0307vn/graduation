import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Province } from "../province/province.entity";

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Province, province => province.id)
    province_id: Province;
}