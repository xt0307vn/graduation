import { IsArray, IsNotEmpty, IsOptional } from "class-validator";
import { Post } from "../../post/post.entity";
import { Role } from "../../role/role.entity";

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
    gender: number;

    @IsOptional()
    dob: string

    @IsOptional()
    role_id: number

    @IsOptional()
    status: boolean

    @IsOptional()
    @IsArray()
    posts?: Post[]
}