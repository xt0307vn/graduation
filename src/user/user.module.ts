import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { FileService } from "../common/file/file.service";
import { IsUniqueUserPhone } from "../common/validators/is-unique-user-phone";
import { IsCheckPassword } from "../common/validators/is-check-password";
import { IsCheckLoginPhone } from "../common/validators/is-check-login-phone";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule
    ],
    providers: [UserService, FileService, IsUniqueUserPhone, IsCheckPassword, IsCheckLoginPhone],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {
}
