import { UserClient } from '../../../http/user-client'

export class UserSynchronizator {
    async getCurrentUser() {
        const savedUser = localStorage.getItem('user');

        if (savedUser == 'undefined' || savedUser == undefined) {
            return null;
        } else {
            return await this.tryUpdateUser(savedUser);
        }
    }

    async tryUpdateUser(cached) {
        try {
            return await new UserClient().me();
        } catch (e) {
            return JSON.parse(cached);
        }
    }
}