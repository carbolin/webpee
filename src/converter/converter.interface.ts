export interface Converter<T> {
    result: T[];
    convert(filePath: string): void | Promise<void>;
}
