import {Injectable, SetMetadata} from '@nestjs/common';
import {registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint} from 'class-validator';

export type IsUniqueInterface = {
    table: string,
    column?: string,
    id?: string;
}

@ValidatorConstraint({name: 'IsUniqueConstraint', async: true})
@Injectable()
export class IsUniqueConstraint {
    constructor() {}

    async validate(value: any, args: ValidationArguments) {

        const [entity, property, id] = args.constraints;
        const dto = args.object as any; // Lấy toàn bộ DTO
        const idf = dto.id; // Lấy id từ DTO

        console.log({
            entity, property, id, value,
            name: 'hahaha',
            idf,
            dto
        })
        return false;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} phải là duy nhất`;
    }
}

export const IsUnique = (entity: Function, property: string, id?: string, validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isUnique',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [entity, property, id],
            validator: IsUniqueConstraint,
        });
    };
};
