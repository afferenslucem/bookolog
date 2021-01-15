export interface IStorage<T> {
    updateMany(books: T[]): Promise<T[]>;
    deleteMany(books: string[]): Promise<void>;
    getAll(): Promise<T[]>;
}
