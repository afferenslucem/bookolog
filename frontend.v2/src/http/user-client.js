import { Client } from "./client";
import {getLogger} from '../logger';
import { BACKEND_URL } from "../config";

export const INCORRECT_CREDENTIALS_EXCEPTION = 'INCORRECT_CREDENTIALS_EXCEPTION';

export class UserClient extends Client {
    constructor() {
        super(BACKEND_URL);
        this.logger = getLogger({
            namespace: 'Http',
            loggerName: 'UserClient'
        });
    }

    async login(username, password) {
        try {
            const answer = await super.post('auth/login', {
                login: username,
                password: password
            },
            {
                withCredentials: true
            });

            this.logger.debug('loggedIn', answer);

            return answer.data;
        }
        catch (e) {
            if(e == 'Error: Request failed with status code 401') {
                throw INCORRECT_CREDENTIALS_EXCEPTION;
            }
        }
    }

    async register(username, email, password) {
        const user = await super.post('auth/register', {
            login: username,
            email: email,
            password: password
        },
        {
            withCredentials: true
        });
        this.logger.debug('registered', user);
        return user;
    }

    async passwordChange(oldPassword, newPassword) {
        await super.post('auth/changePassword', {
            oldPassword,
            newPassword,
        },
        {
            withCredentials: true
        });
    }

    async logout() {
        await super.get('auth/logout',
        {
            withCredentials: true
        });
        this.logger.debug('logout');
    }
}