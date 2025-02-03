import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UserService } from "../../user/user.service";
import * as bcrypt from 'bcrypt';

@ValidatorConstraint({ name: 'isUserExists', async: true })
@Injectable()
export class IsCheckPassword implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UserService) {}

    async validate(password: string, args: ValidationArguments): Promise<boolean> {
        const phone_number = (args.object as any).phone_number;
        const user = await this.usersService.findByPhoneNumber(phone_number);
        if (!user) return false;
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
    }

    defaultMessage(args: ValidationArguments): string {
        return `Mật khẩu không chính xác`;
    }
}