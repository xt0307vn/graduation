import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
    exports: [FileService],
    providers: [FileService]
})
export class FileModule {}
