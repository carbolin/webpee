import { ensureDir, move } from 'fs-extra';
import { basename, dirname, join } from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Cleaner } from './cleaner.interface';

export class FileCleaner implements Cleaner {

  constructor(private _config: WebpeeConfig) { }

  async clean(filepath: string): Promise<void> {

    const filename = basename(filepath);

    const converted: string = dirname(
      filepath.replace(this._config.watching, this._config.converted),
    );

    const newFilepath = join(converted, filename);

    try {
      await ensureDir(converted);

      await move(filepath, newFilepath, { overwrite: true });

      logger.info(`${filename} has been moved to ${this._config.converted}`);

    } catch (error) {

      logger.error('Error while moving File.');
    }
  }
}
