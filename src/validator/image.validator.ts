import path from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { ValidationError } from './validation-error.interface';
import { Validator } from './validator.interface';

export class ImageValidator implements Validator {

  constructor(private _config: WebpeeConfig) { }

  validate(filepath: string): ValidationError | null {

    const extension = path.extname(filepath);

    const fileName = path.basename(filepath);

    if (!this._config.allowedExtensions.includes(extension) || fileName.startsWith('thumb@')) {
      logger.error('Validation error - process aborted.');

      return { extension: true };
    }

    logger.info('Processing ' + fileName + ' for convertion.');
    return null;
  }
}
