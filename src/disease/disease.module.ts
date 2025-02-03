import { Module } from '@nestjs/common';
import { DiseaseController } from './disease.controller';
import { DiseaseService } from './disease.service';
import { FileService } from "../common/file/file.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Disease } from "./disease.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Disease]), AuthModule],
  controllers: [DiseaseController],
  providers: [DiseaseService, FileService],
  exports: [DiseaseService]
})
export class DiseaseModule {}
