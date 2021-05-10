import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';
import { OutputInfo } from 'sharp';

import { logger } from '../3th-party/logger';
import { FileCleaner } from '../cleaner/file.cleaner';
import { WebpeeConfig } from '../config';
import { Converter } from '../converter/converter.interface';
import { Reporter } from '../reporter/reporter.interface';
import { Validator } from '../validator/validator.interface';
import { Watcher } from './watcher.interface';

export class DirectoryWatcher implements Watcher {

  constructor(
    config: WebpeeConfig,
    private _validator: Validator,
    private _converter: Converter<OutputInfo>,
    private _reporter: Reporter<OutputInfo>,
    private _cleaner: FileCleaner
  ) {

    const { watching } = config;

    const dir = path.resolve(watching);

    const watcher = chokidar.watch(dir, {
      ignored: /^.*\.(?!png$|svg$|jpeg$|jpg$|gif$|tiff$)[^.]+$/,
      ignoreInitial: true,
      awaitWriteFinish: true,
    });

    watcher.on('add', filepath => this.onAdd(filepath));
  }

  async onAdd(filepath: string): Promise<void> {

    const result = this._validator.validate(filepath);

    if (!result) {

      await this._converter.convert(filepath);

      this._reporter.report(this._converter.result, filepath);

      this._cleaner.clean(filepath);
    }

    else
      logger.info('Ignoring image due to validation error. Pee another image...')
  }
}
