import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class ParseToArrayInterceptor implements NestInterceptor {
    constructor(private readonly field: string) {
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            const request = context.switchToHttp().getRequest();
            request.body[this.field] = JSON.parse(request.body[this.field]);
            console.log({
                message: 'parse to array',
                body: request.body[this.field]
            })
            return next.handle();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}

export function ParseToArrayInterceptorFactory(field: string) {
    return new ParseToArrayInterceptor(field);
}