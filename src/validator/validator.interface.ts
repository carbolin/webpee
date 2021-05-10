import { ValidationError } from './validation-error.interface';

export interface Validator {
    validate(filepath: string): null | ValidationError;
}
