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
            });

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
        });
        
        return user;
    }

    async me() {
        const user = await super.get('user/me');
        
        return user.data;
    }

    async passwordChange(oldPassword, newPassword) {
        await super.post('auth/changePassword', {
            oldPassword,
            newPassword,
        });
    }

    async emailChange(email) {
        await super.get(`user/changeEmail/${email}`);
    }

    async passwordRecover(email) {
        await super.get('auth/recoverPassword/' + email);
    }

    async logout() {
        await super.get('auth/logout');
    }

    async loadUser(login) {
        const user = await super.get(`user/${login}`);
        
        return user.data;
    }

    async uploadAvatar(formData) {
        const user = await super.post(`user/uploadAvatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            timeout: 600000,
        });
        
        return user.data;
    }
}