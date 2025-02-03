import { IsNotEmpty, IsOptional } from "class-validator";

export class MedicineUpdateDto{
    id: number;

    @IsNotEmpty({message: "Tên không được để trống"})
    name: string;
    slug: string;

    @IsOptional()
    image: string;

    @IsNotEmpty({message: "Chỉ định không được để trống"})
    indication: string;

    @IsNotEmpty({message: "Dạng bào chế không được để trống"})
    dosage_form: string;

    @IsNotEmpty({message: "Hoạt chất không được để trống"})
    active_ingredient: string;

    content: string;
    tags: string;

    @IsOptional()
    created_at: string
}