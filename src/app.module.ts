import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OcrService } from './services/ocr-service/ocr.service';
import { ImageProcessingService } from './services/image-processing/image-processing.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OcrService, ImageProcessingService],
})
export class AppModule {}
