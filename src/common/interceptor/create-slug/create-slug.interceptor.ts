import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException, HttpStatus,
    Injectable,
    NestInterceptor, Type
} from "@nestjs/common";
import { Observable } from "rxjs";
import generateSlug from "../../functions/GenerateSlug";

@Injectable()
export class CreateSlugInterceptor implements NestInterceptor {
    constructor(private readonly field: string) {
    }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            const request = context.switchToHttp().getRequest();
            if (request.body[this.field]) {
                request.body.slug = generateSlug(request.body[this.field])
            } else {
                throw new BadRequestException({
                    message: [
                        {
                            property: this.field,
                            message: `${this.field} must not empty`
                        }
                    ],
                    statusCode: 400,
                });
            }
            return next.handle();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}

export function CreateSlugInterceptorFactory(field: string) {
    return new CreateSlugInterceptor(field);
}