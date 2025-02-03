import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationError } from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordMatching', async: false })
export class IsPasswordMatching implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments) {
        const object = args.object as any;
        return confirmPassword === object.password;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Mật khẩu không khớp';
    }
}
