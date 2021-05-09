export interface Reporter<T> {
    report(result: T[]): void;
}
