import chokidar, { FSWatcher } from 'chokidar';
import path from 'path';

import { WebpeeConfig } from '../config';

export class DirectoryWatcher {

  watcher: FSWatcher;

  constructor(private _config: WebpeeConfig) {

    const { watching } = _config;

    const dir = path.resolve(watching);

    this.watcher = chokidar.watch(dir, {
      ignored: /^.*\.(?!png$|svg$|jpeg$|jpg$|gif$|tiff$)[^.]+$/,
      ignoreInitial: true,
      awaitWriteFinish: true,
    });
  }
}
