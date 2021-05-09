export interface Converter<T> {
    result: T[];
    convert(): void;
}
