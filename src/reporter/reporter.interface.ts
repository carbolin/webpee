export interface Reporter<T> {
    report(result: T[], filePath: string): void | Promise<void>;
}
