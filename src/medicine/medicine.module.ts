import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Medicine } from "./medicine.entity";
import { FileService } from "../common/file/file.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Medicine]), AuthModule],
  providers: [MedicineService, FileService],
  controllers: [MedicineController],
  exports: [MedicineService]
})
export class MedicineModule {}
