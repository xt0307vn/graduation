import { IsArray, IsEmail, IsEmpty, IsNotEmpty, IsOptional } from "class-validator";
import { Post } from "../../post/post.entity";

export class CategoryCreateDto {
    id: number;

    @IsNotEmpty({message: "Tên không được để trống"})
    name: string;

    slug: string;

    @IsOptional()
    created_at: string;

    @IsOptional()
    content: string;

    @IsOptional()
    @IsArray()
    posts?: Post[]
}