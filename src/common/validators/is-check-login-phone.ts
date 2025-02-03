import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from "../../user/user.service";

@ValidatorConstraint({ name: 'isUserExists', async: true })
@Injectable()
export class IsCheckLoginPhone implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UserService) {}

    async validate(phone_number: string): Promise<boolean> {
        const user = await this.usersService.findByPhoneNumber(phone_number);
        return !!user;
    }

    defaultMessage(args: ValidationArguments): string {
        return `Số điện thoại không tồn tại!`;
    }
}