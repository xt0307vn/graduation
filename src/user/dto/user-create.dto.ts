import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Length,
    Matches,
    Validate,
    ValidateIf
} from "class-validator";
import { Post } from "../../post/post.entity";
import { IsPasswordMatching } from "../../common/validators/is-password-matching.validator";
import { IsUniqueUserPhone } from "../../common/validators/is-unique-user-phone";
import { Role } from "../../role/role.entity";

export class UserCreateDto {
    id: number;

    @IsOptional()
    name: string;

    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    password: string;

    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    @ValidateIf((o) => o.confirm_password !== undefined)
    @Validate(IsPasswordMatching)
    confirm_password: string;

    @IsNotEmpty({message: "Số điện thoại không được để trống"})
    @Matches(/^[0-9]+$/, {
        message: "Số điện thoại phải là số"
    })
    @Length(10, 10, {
        message: 'Số điện thoại phải có 10 chữ số',
    })
    @Validate(IsUniqueUserPhone)
    phone_number: string;

    @IsOptional()
    email: string;

    @IsOptional()
    gender: number;

    @IsOptional()
    dob: string;

    @IsOptional()
    role_id: number;

    @IsOptional()
    status: boolean;

    @IsOptional()
    @IsArray()
    posts?: Post[];
}