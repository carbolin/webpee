import fs from 'fs-extra';
import path from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Cleaner } from './cleaner.interface';

export class FileCleaner implements Cleaner {

  constructor(private _config: WebpeeConfig) { }

  async clean(filepath: string): Promise<void> {

    const filename = path.basename(filepath);

    const converted: string = path.dirname(
      filepath.replace(this._config.watching, this._config.converted),
    );

    const newFilepath = path.join(converted, filename);

    try {
      await fs.ensureDir(converted);

      await fs.move(filepath, newFilepath, { overwrite: true });

      logger.info(`${filename} has been moved to ${this._config.converted}`);

    } catch (error) {

      logger.error('Error while moving File.');
    }

  }
}
