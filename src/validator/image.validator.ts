import { basename, extname } from 'path';

import { logger } from '../3th-party/logger';
import { WebpeeConfig } from '../config';
import { ValidationError } from './validation-error.interface';
import { Validator } from './validator.interface';

export class ImageValidator implements Validator {

  constructor(private _config: WebpeeConfig) { }

  validate(filepath: string): ValidationError | null {

    const extension = extname(filepath);

    const fileName = basename(filepath);

    if (this._config.allowedExtensions.includes(extension) && !fileName.startsWith('thumb@')) {

      logger.info(`Validation on ${fileName} was successfull. Starting conversion.`);

      return null;
    }

    const error: ValidationError = {};

    if (!this._config.allowedExtensions.includes(extension))

      error.extension = true;

    if (fileName.startsWith('thumb@'))

      error.filename = true;

    logger.error(`Validation on ${fileName} failed. Conversion aborted, ${JSON.stringify(error)}`);

    return error;
  }
}
