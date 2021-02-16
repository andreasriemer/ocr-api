import { OcrService } from './services/ocr-service/ocr.service';
import { Injectable } from '@nestjs/common';
import { OcrResult } from './utils/ocr/ocr-result';

@Injectable()
export class AppService {
  constructor(private ocrService: OcrService) {}
  async recognize(file: Express.Multer.File): Promise<OcrResult> {
    return await this.ocrService.recognize(file);
  }
}
