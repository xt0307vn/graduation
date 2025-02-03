import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Post } from "../../post/post.entity";

export class UserUpdateDto {
    id: number

    @IsOptional()
    name: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    phone_number: string

    @IsOptional()
    email: string

    @IsOptional()
    dob: string

    @IsOptional()
    status: boolean

    @IsOptional()
    @IsArray()
    posts?: Post[]
}