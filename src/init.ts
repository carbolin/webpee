import { logger } from './3th-party/logger';
import { FileCleaner } from './cleaner/file.cleaner';
import { WebpeeConfig } from './config';
import { WebpConverter } from './converter/webp.converter';
import { JsonReporter } from './reporter/json.reporter';
import { ImageValidator } from './validator/image.validator';
import { DirectoryWatcher } from './watcher/directory.watcher';

const config = new WebpeeConfig();

const validator = new ImageValidator(config);

const converter = new WebpConverter(config);

const reporter = new JsonReporter(config);

const cleaner = new FileCleaner(config);

export const init = (): void => {

  const watcher = new DirectoryWatcher(config, validator, converter, reporter, cleaner);

  watcher.watch();

  logger.info(`Webpee is listening in '${config.watching}'. Pee new images... `);
};
