import { BookProgress } from './book-progress';

export class PageBookProgress extends BookProgress<number> {
    public convertToNumber(value: number): number {
        return +value;
    }

    public convertFromNumber(value: number): number {
        return value;
    }
}
