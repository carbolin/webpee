export interface Watcher {
    onAdd(path: string): void | Promise<void>;
}
