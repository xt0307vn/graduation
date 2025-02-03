import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { Type } from "../../type/type.entity";

export class DiseaseCreateDto {

    id: number;

    @IsNotEmpty({message: "Tên không được để trống"})
    name: string;

    slug: string;

    @IsNotEmpty({message: "Tiêu đề không được để trống"})
    title: string;

    @IsNotEmpty({message: "Tổng quát không được để trống"})
    overview: string;

    @IsOptional()
    image: string;

    @IsNotEmpty({message: "Triệu chứng không được để trống"})
    symptoms: string;

    @IsNotEmpty({message: "Nguyên nhân không được để trống"})
    causes: string;

    @IsNotEmpty({message: "Điều trị không được để trống"})
    treatment_methods: string;

    @IsNotEmpty({message: "Phòng ngừa không được để trống"})
    disease_prevention: string;

    @IsNotEmpty({message: "Đối tượng nguy cơ không được để trống"})
    risk_factors: string;

    @IsNotEmpty({message: "Chuẩn đoán không được để trống"})
    diagnosis: string;

    @IsOptional()
    created_at: string;

    @IsOptional()
    @IsArray()
    types?: Type[];
}