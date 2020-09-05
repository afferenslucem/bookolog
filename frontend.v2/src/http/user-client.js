import { Client } from "./client";
import {getLogger} from '../logger';
import { BACKEND_URL } from "./config";

export class UserClient extends Client {
    constructor() {
        super(BACKEND_URL);
        this.logger = getLogger({
            namespace: 'Http',
            loggerName: 'UserClient'
        });
    }

    async login(username, password) {
        const user = await super.post('auth/login', {
            login: username,
            password: password
        },
        {
            withCredentials: true
        });
        this.logger.debug('loggedIn', user);
        return user.data;
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

    async logout() {
        await super.get('auth/logout',
        {
            withCredentials: true
        });
        this.logger.debug('logout');
    }
}