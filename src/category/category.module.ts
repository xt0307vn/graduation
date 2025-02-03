import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { FileService } from "../common/file/file.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  providers: [CategoryService, FileService],
  controllers: [CategoryController],
  exports: [CategoryService]
})
export class CategoryModule {}
