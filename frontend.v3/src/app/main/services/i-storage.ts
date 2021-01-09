export interface IStorage<T> {
    updateMany(books: T[]): Promise<T[]>;
    deleteMany(books: T[]): Promise<T[]>;
    getAll(): Promise<T[]>;
}