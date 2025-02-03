import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException, HttpStatus,
    Injectable,
    NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import generateSlug from "../../functions/GenerateSlug";

@Injectable()
export class TestSlugInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            const request = context.switchToHttp().getRequest();
            if (request.body['name']) {
                request.body.slug = generateSlug(request.body['name']);
            } else {
                throw new BadRequestException(`name ggggggggggg must not empty`);
            }
            return next.handle();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
