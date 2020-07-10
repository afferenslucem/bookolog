import { HttpError } from './http-error';

export class HttpResult<T> {
    private data: T | null;
    private error: HttpError | null;

    public constructor (data: T | null, error: HttpError | null = null) {
        this.data = data;
        this.error = error;
    }

    public get Data(): T | null {
        return this.data;
    }

    public get Error(): HttpError | null {
        return this.error;
    }

    public get IsSuccess(): boolean {
        return this.error == undefined;
    }
}