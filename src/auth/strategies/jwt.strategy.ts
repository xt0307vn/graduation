import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "node:process";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET_KEY
        });
    }

    async validate(payload: { sub: string, phone_number: string}) {
        console.log("Xin chao")
        return {
            userId: payload.sub,
            phone_number: payload.phone_number,
            message: "Đây là thông tin tu jwt.strategy"
        }
    }
}