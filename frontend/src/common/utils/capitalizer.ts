export class Capitalizer {
    public capitalize(value: string): string;
    public capitalize(values: string[]): string[];
    public capitalize(value: string | string[]): string | string[] {
        if (Array.isArray(value)) {
            return value.map(item => this.capitalize(item));
        } else {
            return value.slice(0, 1).toUpperCase() + value.slice(1);
        }
    }
}
