import axios, { AxiosResponse, AxiosError } from 'axios';
import { LoginResult } from '@/types/authentication/login-result';
import { LoginData } from '@/types/authentication/login-data';
import { HttpResult } from '@/types/http-result';
import { Book } from '@/types/books-module';

export class HttpClient {
    private static host = 'https://localhost:44304';
    private static baseOptions = { withCredentials: true };

    public async login(data: LoginData): Promise<HttpResult<LoginResult>> {
        return this.post(`${HttpClient.host}/authenticate/login`, data);
    }

    public async isLoggedIn(): Promise<HttpResult<LoginResult>> {
        return this.get(`${HttpClient.host}/user/me`);
    }

    public async getBooks(): Promise<HttpResult<Book[]>> {
        return this.get(`${HttpClient.host}/book/all`);
    }

    public async updateBook(book: Book): Promise<HttpResult<Book>> {
        return this.put(`${HttpClient.host}/book/edit/${book.id}`, book);
    }

    public async createBook(book: Book): Promise<HttpResult<Book>> {
        return this.post(`${HttpClient.host}/book/create`, book);
    }

    public async deleteBook(book: Book): Promise<HttpResult<Book>> {
        return this.delete(`${HttpClient.host}/book/delete/${book.id}`);
    }

    private post<T>(url: string, data: any, options = HttpClient.baseOptions): Promise<HttpResult<T>> {
        return this.sendRequest(() => axios.post<T>(url, data, options));
    }

    private put<T>(url: string, data: any, options = HttpClient.baseOptions): Promise<HttpResult<T>> {
        return this.sendRequest(() => axios.put<T>(url, data, options));
    }

    private get<T>(url: string, options = HttpClient.baseOptions): Promise<HttpResult<T>> {
        return this.sendRequest(() => axios.get<T>(url, options));
    }

    private delete<T>(url: string, options = HttpClient.baseOptions): Promise<HttpResult<T>> {
        return this.sendRequest(() => axios.delete<T>(url, options));
    }

    private async sendRequest<T>(request: () => Promise<AxiosResponse>): Promise<HttpResult<T>> {
        try {
            const result = await request();

            return new HttpResult(result.data);
        } catch(error) {
            return this.catchError<T>(error);
        }
    }

    private catchError<T>(error: AxiosError): HttpResult<T> {
        if(error.response) {
            return new HttpResult<T>(null, {
                code: error.response.status,
                status: error.response.data
            });
        } else if (error.request) {
            return new HttpResult<T>(null, {
                code: 404,
                status: error.message
            });
        } else {
            return new HttpResult<T>(null, {
                code: -1,
                status: error.message
            });
        }
    }
}