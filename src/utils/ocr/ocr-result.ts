export interface OcrResult {
  lines: Array<{ text: string; words: Array<string> }>;
  text: string;
}
