import path from 'path';

import { logger } from './3th-party/logger';
import { FileCleaner } from './cleaner/file.cleaner';
import { WebpeeConfig } from './config';
import { WebpConverter } from './converter/webp.converter';
import { JsonReporter } from './reporter/json.reporter';
import { DirectoryWatcher } from './watcher/directory.watcher';

logger.info('Watching started...');

const config = new WebpeeConfig();

const watcher = new DirectoryWatcher(config);

watcher.watcher.on('add', fullFilePath => {

  const extension = path.extname(fullFilePath);

  const fileName = path.basename(fullFilePath);

  const croppedFilename = fileName.substr(0, fileName.lastIndexOf('.'));

  if (!config.allowedExtensions.includes(extension) || fileName.startsWith('thumb@')) {
    logger.error('Convertion aborted - wrong File Extension.');
  }

  logger.info('Processing ' + fileName + ' for convertion.');

  const converter = new WebpConverter(config, fullFilePath, croppedFilename);

  const reporter = new JsonReporter(config, fullFilePath, croppedFilename);

  const cleaner = new FileCleaner(config, fullFilePath, fileName);

  converter.convert()
    .then(() => reporter.report(converter.result))
    .then(() => cleaner.clean());

});

watcher.watcher.on('unlink', fullFilePath => {

  const fileName = path.basename(fullFilePath);

  logger.info(fileName + ' processing finished.');
});
