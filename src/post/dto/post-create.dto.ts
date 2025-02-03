import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { User } from "../../user/user.entity";
import { Category } from "../../category/category.entity";

export class PostCreateDto {
    id: number;

    @IsNotEmpty({message: "Tiêu đề không được để trống"})
    title: string;

    slug: string;

    @IsOptional()
    image: string;

    @IsNotEmpty({message: "Nội dung không được để trống"})
    content: string;

    @IsOptional()
    created_at: string

    @IsNotEmpty()
    user_id: User

    @IsNotEmpty({message: "Danh mục không được để trống"})
    category_id: number;

    @IsOptional()
    category?: Category
}