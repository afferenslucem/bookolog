import axios from 'axios';
import { UserModule } from "@/types/user-module";
import { BookResponse, Book } from '@/types/books-module';
import { BookMutations } from '../books/storage-methods';
import { ActionTree, MutationTree } from 'vuex';
import { StoreType } from '@/store';

export const state: UserModule = {
    loggedIn: false
};

export enum UserMutations {
    login = 'USER_login',
    logout = 'USER_logout',
}

export enum UserActions {
    login = 'USER_login',
    logout = 'USER_logout',
}

export const mutations: MutationTree<UserModule> = {
    [UserMutations.login](state: UserModule) {
        state.loggedIn = true;
    },
    [UserMutations.logout](state: UserModule) {
        state.loggedIn = false;
    }
};

export const actions: ActionTree<UserModule, StoreType> = {
    async [UserMutations.login]({commit}): Promise<void> {
        const answer = await axios.get<BookResponse>('/books.json');

        const books = answer.data.books.map(item => new Book(item));

        commit(BookMutations.pushBooks, books);

        commit(UserMutations.login);
    },
    [UserMutations.logout]({commit}: any): void {
        commit(UserMutations.logout);
    }
};