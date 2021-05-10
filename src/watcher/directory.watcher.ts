import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { ImageValidator } from '../validator/image.validator';
import { Watcher } from './watcher.interface';

export class DirectoryWatcher implements Watcher {

  private _watcher: FSWatcher;

  private _validator: ImageValidator;

  constructor(public config: WebpeeConfig) {

    const { watching } = config;

    const dir = path.resolve(watching);

    this._watcher = chokidar.watch(dir, {
      ignored: /^.*\.(?!png$|svg$|jpeg$|jpg$|gif$|tiff$)[^.]+$/,
      ignoreInitial: true,
      awaitWriteFinish: true,
    });

    this._watcher.on('add', filepath => this.watchOnAdd(filepath));

    this._watcher.on('unlink', filepath => this.watchOnDelete(filepath));

    this._validator = new ImageValidator(config);

  }

  watchOnAdd(filepath: string): void {

    const result = this._validator.validate(filepath);

    if (!result)

    




  }

  watchOnDelete(filepath: string): void {

    throw new Error('Method not implemented.');
  }

}
