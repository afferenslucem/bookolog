import axios from 'axios';
import { UserModule } from "@/types/user-module";
import { BookResponse } from '@/types/books-module';
import { BookMutations } from '../books/storage-methods';

export const state: UserModule = {
    loggedIn: false
};

export enum UserMutations {
    login = 'USER_login',
    logout = 'USER_logout',
};

export enum UserActions {
    login = 'USER_login',
    logout = 'USER_logout',
};

export const mutations = {
    [UserMutations.login](state: UserModule) {
        state.loggedIn = true;
    },
    [UserMutations.logout](state: UserModule) {
        state.loggedIn = false;
    }
};

export const actions = {
    async [UserMutations.login]({commit}: any): Promise<void> {
        const answer = await axios.get<BookResponse>('/books.json');

        const books = answer.data.books;

        commit(BookMutations.pushBooks, books);

        commit(UserMutations.login);
    },
    [UserMutations.logout]({commit}: any): void {
        commit(UserMutations.logout);
    }
};