export interface Cleaner {
    clean(filepath: string): void | Promise<void>;
}
