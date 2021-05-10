import fs from 'fs-extra';
import path from 'path';
import { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Reporter } from './reporter.interface';

export class JsonReporter implements Reporter<OutputInfo> {

  constructor(private _config: WebpeeConfig) { }

  async report(result: OutputInfo[], filepath: string): Promise<void> {

    const filename = path.basename(filepath);

    const croppedFilename = filename.substr(0, filename.lastIndexOf('.'));

    try {
      const outputDir = this.generateOutputDir(filepath, croppedFilename);

      await fs.ensureDir(outputDir);

      const reportName = `${croppedFilename}_report.json`;

      const outputFilePath = path.join(outputDir, reportName);

      await fs.outputFile(outputFilePath, JSON.stringify(result));

      logger.info(`Reported task to ${reportName}.`)

    } catch (error) {

      logger.error('Error while printing report to JSON.');
    }

  }

  private generateOutputDir(filePath: string, cropFilename: string): string {

    const dir = path.dirname(filePath.replace(this._config.watching, this._config.output));

    return path.join(dir, cropFilename);
  };
}
