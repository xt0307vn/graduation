import { IsArray, IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Type } from "../../type/type.entity";

export class DiseaseUpdateDto {

    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    title: string;

    @IsOptional()
    overview: string;

    @IsOptional()
    image: string;

    @IsOptional()
    symptoms: string;

    @IsOptional()
    causes: string;

    @IsOptional()
    treatment_methods: string;

    @IsOptional()
    disease_prevention: string;

    @IsOptional()
    risk_factors: string;

    @IsOptional()
    diagnosis: string;

    @IsOptional()
    created_at: string;

    @IsOptional()
    @IsArray()
    types?: Type[];
}