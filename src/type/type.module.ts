import { Module } from '@nestjs/common';
import { TypeService } from "./type.service";
import { TypeController } from "./type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "./type.entity";
import { FileService } from "../common/file/file.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Type]), AuthModule],
    providers: [TypeService, FileService],
    controllers: [TypeController]
})
export class TypeModule {

}
