import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { editFileName } from './utils/file-upload/edit-file-name';
import { imageFileFilter } from './utils/file-upload/image-filter-file';
import { OcrResult } from './utils/ocr/ocr-result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async recognize(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<OcrResult> {
    const result = await this.appService.recognize(file);
    result.lines.forEach(line => {
      if (/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.test(line.text)) {
        console.log(line);
        console.log(line.text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/).input);
      }
    });
    return result;
  }
}
