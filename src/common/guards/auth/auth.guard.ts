import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Roles} from "../../decorators/roles/roles.decorator";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector, private readonly jwtService: JwtService) {
    }
    async canActivate(context: ExecutionContext,) {
        const roles = this.reflector.get(Roles, context.getHandler());
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split(' ')[1];
        if(!token) {
            throw new ForbiddenException({
                status: HttpStatus.FORBIDDEN,
                message: "Forbidden"
            })
        }
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            const role = tokenPayload.role_id
            if(role == roles[0]) {
                return true;
            }
        } catch (e) {
            throw new ForbiddenException({
                status: HttpStatus.FORBIDDEN,
                message: "Forbidden"
            })
        }
    }
}
