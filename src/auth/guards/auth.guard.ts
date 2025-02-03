import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import {Observable} from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContext,){
        // console.log(context.switchToHttp().getRequest())
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        // console.log(authorization)
        const token = authorization?.split(' ')[1];

        if(!token) {
            throw new UnauthorizedException();
        }

        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = tokenPayload
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                status: HttpStatus.UNAUTHORIZED,
                message: "Unauthorized"
            })
        }
    }
}
