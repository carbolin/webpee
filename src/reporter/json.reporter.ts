import { ensureDir, outputFile } from 'fs-extra';
import { basename, dirname, join } from 'path';
import { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Reporter } from './reporter.interface';

export class JsonReporter implements Reporter<OutputInfo> {

  constructor(private _config: WebpeeConfig) { }

  async report(result: OutputInfo[], filepath: string): Promise<void> {

    try {
      const outputDir = this.generateOutputDir(filepath);

      await ensureDir(outputDir);

      const outputFilepath = join(outputDir, 'report.json');

      await outputFile(outputFilepath, JSON.stringify(result));

      logger.info(`Reported task to ${outputFilepath}.`);

    } catch (error) {

      logger.error('Error while printing report to JSON.');
    }

  }

  private generateOutputDir(filepath: string): string {

    const filename = basename(filepath);

    const croppedFilename = filename.substr(0, filename.lastIndexOf('.'));

    const dir = dirname(filepath.replace(this._config.watching, this._config.output));

    return join(dir, croppedFilename);
  };
}
