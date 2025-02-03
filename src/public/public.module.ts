import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from "./public.controller";
import { MedicineModule } from "../medicine/medicine.module";
import { FileService } from "../common/file/file.service";
import { DiseaseModule } from "../disease/disease.module";
import { PostModule } from "../post/post.module";

@Module({
  imports: [MedicineModule, DiseaseModule, PostModule],
  providers: [PublicService, FileService],
  controllers: [PublicController]
})
export class PublicModule {}
