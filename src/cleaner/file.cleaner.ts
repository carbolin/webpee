import fs from 'fs-extra';
import path from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { Cleaner } from './cleaner.interface';

export class FileCleaner implements Cleaner {

  constructor(
    private _config: WebpeeConfig,
    private _filePath: string,
    private _fileName: string,
  ) { }

  async clean(): Promise<void> {

    const convDir: string = path.dirname(
      this._filePath.replace(this._config.watching, this._config.converted),
    );

    const convFullPath = path.join(convDir, this._fileName);

    try {
      await fs.ensureDir(convDir);

      fs.move(this._filePath, convFullPath, { overwrite: true });

    } catch (error) {

      logger.error('Error while moving File.');
    }

  }
}
