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
export class ConfirmPasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        try {
            const request = context.switchToHttp().getRequest();
            if (!request.body["confirm_password"]) {
                const result = [
                    {
                        property: 'confirm_password',
                        message: "Không được troongs"
                    }
                ]
                throw new BadRequestException({
                    message: result
                });
            }

            if (request.body["confirm_password"] != request.body.password) {
                throw new BadRequestException(`confirm không khớp`);
            }

            return next.handle();
        } catch (e) {
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}
