import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./post.entity";
import { FileService } from "../common/file/file.service";
import { CategoryService } from "../category/category.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post]), AuthModule],
  controllers: [PostController],
  providers: [PostService, FileService],
  exports: [PostService]
})
export class PostModule {}
