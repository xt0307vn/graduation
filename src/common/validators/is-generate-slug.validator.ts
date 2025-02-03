import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, ValidationError } from 'class-validator';

@ValidatorConstraint({ name: 'isGenerateSlug', async: false })
export class IsGenerateSlugValidator implements ValidatorConstraintInterface {
    validate(slug: string, args: ValidationArguments) {
        const object = args.object as any;
        const field = args.constraints[0];
        const name = '11111111111111111111111111111111'
        return field;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Slug không được để trống';
    }
}
