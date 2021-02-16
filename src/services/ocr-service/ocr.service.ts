import { OcrResult } from './../../utils/ocr/ocr-result';
import { Injectable } from '@nestjs/common';
import { OcrConfig } from 'src/utils/ocr/ocr-config';
import { OEM } from 'src/utils/ocr/oem';
import { PSM } from 'src/utils/ocr/psm';
import * as tesseract from 'node-tesseract-ocr';
import * as sharp from 'sharp';

@Injectable()
export class OcrService {
  static readonly defaultConfig: OcrConfig = {
    lang: 'deu',
    oem: OEM.DEFAULT,
    psm: PSM.SINGLE_BLOCK,
    dpi: 300,
  };

  static toOcrResult(text: string): OcrResult {
    return {
      text,
      lines: text.split('\n').map(entry => {
        return {
          text: entry.trim(),
          words: entry
            .trim()
            .split(' ')
            .filter(Boolean),
        };
      }),
    };
  }

  async recognize(
    file: Express.Multer.File,
    config?: OcrConfig,
  ): Promise<OcrResult> {
    config = {
      ...OcrService.defaultConfig,
      ...config,
    };
    const fileDestination = file.destination;
    const spllittedName = file.filename.split('.');
    const fileName = spllittedName[0];
    const fileExtension = 'tif';
    const processedFileName = `${fileName}-processed-${Date.now()}.${fileExtension}`;
    const originalImage = sharp(file.path);

    const { density, width, height } = await originalImage.metadata();

    const contrast = 1.5;
    console.log(
      fileDestination,
      'density:',
      density,
      '',
      '(density / 300)',
      density / 300,
      'height:',
      height,
    );

    await originalImage
      // .resize(Math.round(width * (density / 300))) // THIS ONE MAY BE BETTER IF THERE WILL BE DENSITY ALWAYS
      .resize(undefined, Math.round(Math.max(2000, height * 0.5)))
      // .resize(Math.round((width / density) * config.dpi))
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } }) // merge opacity to white
      .threshold(120, { grayscale: true })
      // .linear(contrast, -(128 * contrast) + 128)
      .sharpen()
      .tiff() // ({ bitdepth: 1, xres: config.dpi / 25, yres: config.dpi / 25 })
      .withMetadata()
      .toFile(`${fileDestination}/${processedFileName}`);
    return OcrService.toOcrResult(
      await tesseract.recognize(
        `${fileDestination}/${processedFileName}`,
        config,
      ),
    );
  }
}
