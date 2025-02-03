import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UserModule } from "../user/user.module";
import * as process from "node:process";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        // JwtModule.register({
        //     secret: process.env.SECRET_KEY,
        //     signOptions: { expiresIn: process.env.EXPIRES_IN}
        // }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...configService.get("jwt")
            })
        }),
        forwardRef(() => UserModule)
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [JwtModule]
})
export class AuthModule {}