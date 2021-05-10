export interface Watcher {

    watchOnAdd(path: string): void;

    watchOnDelete(path: string): void;
}
