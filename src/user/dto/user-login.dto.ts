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
import { IsCheckPassword } from "../../common/validators/is-check-password";
import { IsCheckLoginPhone } from "../../common/validators/is-check-login-phone";

export class UserLoginDto {
    id: number;

    @IsOptional()
    name: string;

    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    @Validate(IsCheckPassword)
    password: string;

    @IsNotEmpty({message: "Số điện thoại không được để trống"})
    @Matches(/^[0-9]+$/, {
        message: "Số điện thoại phải là số"
    })
    @Length(10, 10, {
        message: 'Số điện thoại phải có 10 chữ số',
    })
    @Validate(IsCheckLoginPhone)
    phone_number: string;

    @IsOptional()
    email: string;

    @IsOptional()
    dob: string;

    @IsOptional()
    status: boolean;

    @IsOptional()
    @IsArray()
    posts?: Post[];
}