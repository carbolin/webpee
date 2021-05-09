import fs from 'fs-extra';
import path from 'path';
import sharp, { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Converter } from './converter.interface';

export class WebpConverter implements Converter<OutputInfo> {
  result: OutputInfo[] = [];

  constructor(
    private _config: WebpeeConfig,
    private _filePath: string,
    private _fileName: string,
  ) { }

  async convert(): Promise<void> {

    const outputDir = this.generateOutputDir();

    try {
      await fs.ensureDir(outputDir);

      const data = this._config.sizes.map((size) => {
        const thumbName = `thumb@${size.width}x${size.height}_${this._fileName}.webp`;

        const outputFilePath = path.join(outputDir, thumbName);

        return sharp(this._filePath)
          .resize(size.width, size.height)
          .webp({ quality: this._config.quality })
          .toFile(outputFilePath);
      });

      this.result = await Promise.all(data);

    } catch (error) {
      logger.error('Output file directory was not created.');
    }

  }

  private generateOutputDir(): string {
    const dir = path.dirname(this._filePath.replace(this._config.watching, this._config.output));

    return path.join(dir, this._fileName);
  };
}
