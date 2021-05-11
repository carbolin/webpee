import { ensureDir } from 'fs-extra';
import { basename, dirname, join } from 'path';
import sharp, { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Converter } from './converter.interface';

export class WebpConverter implements Converter<OutputInfo> {

  result: OutputInfo[] = [];

  constructor(private _config: WebpeeConfig) { }

  async convert(filepath: string): Promise<void> {

    const filename = basename(filepath);

    const croppedFilename = filename.substr(0, filename.lastIndexOf('.'));

    const outputDir: string = this.generateOutputDir(filepath, croppedFilename);

    try {
      await ensureDir(outputDir);

      const data = this._config.sizes.map((size) => {
        const thumbName = `thumb@${size.width}x${size.height}_${croppedFilename}.webp`;

        const outputFilepath = join(outputDir, thumbName);

        return sharp(filepath)
          .resize(size.width, size.height)
          .webp({ quality: this._config.quality })
          .toFile(outputFilepath);
      });

      logger.info(`${croppedFilename} has been converted.`);

      this.result = await Promise.all(data);

    } catch (error) {

      logger.error('Output file directory was not created.');
    }

  }

  private generateOutputDir(filePath: string, cropFilename: string): string {
    const dir: string = dirname(filePath.replace(this._config.watching, this._config.output));

    return join(dir, cropFilename);
  };
}
