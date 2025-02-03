import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { WardModule } from './ward/ward.module';
import { RoleModule } from './role/role.module';
import { PostModule } from './post/post.module';
import { MedicineModule } from './medicine/medicine.module';
import { DiseaseModule } from './disease/disease.module';
import { FileModule } from './common/file/file.module';
import configuration from "./common/config/configuration";
import { FileService } from "./common/file/file.service";
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
import { AuthModule } from "./auth/auth.module";
import { PublicModule } from './public/public.module';
import configurationJwt from "./common/config/configuration-jwt";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration, configurationJwt],
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...configService.get("database")
            })
        }),
        UserModule,
        ProvinceModule,
        DistrictModule,
        WardModule,
        RoleModule,
        PostModule,
        MedicineModule,
        DiseaseModule,
        FileModule,
        CategoryModule,
        TypeModule,
        AuthModule,
        PublicModule
    ],
    controllers: [AppController],
    providers: [AppService, FileService]
})
export class AppModule {
    constructor(private dataSource: DataSource) {
    }
}
