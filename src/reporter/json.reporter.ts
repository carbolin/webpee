import fs from 'fs-extra';
import path from 'path';
import { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Reporter } from './reporter.interface';

export class JsonReporter implements Reporter<OutputInfo> {

  constructor(
    private _config: WebpeeConfig,
    private _filePath: string,
    private _fileName: string,
  ) { }

  async report(result: OutputInfo[]): Promise<void> {

    try {
      const outputDir = this.generateOutputDir();

      await fs.ensureDir(outputDir);

      const reportName = `${this._fileName}_report.json`;

      const outputFilePath = path.join(outputDir, reportName);

      logger.info('Reporting to JSON ' + reportName);

      await fs.outputFile(outputFilePath, JSON.stringify(result));

    } catch (error) {

      logger.error('Error while printing report to JSON.');
    }

  }

  private generateOutputDir(): string {

    const dir = path.dirname(this._filePath.replace(this._config.watching, this._config.output));

    return path.join(dir, this._fileName);
  };
}
