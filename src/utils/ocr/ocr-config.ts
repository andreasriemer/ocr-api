import { PSM } from './psm';
import { OEM } from './oem';
export interface OcrConfig {
  lang: string;
  oem?: OEM;
  psm?: PSM;
  dpi?: number;
  tessedit_char_whitelist?: string;
}
