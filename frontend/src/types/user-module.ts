import { HttpError } from './http-error';

export interface UserModule {
    id: number;
    login: string;
    loggedIn: boolean;
    error: HttpError;
}