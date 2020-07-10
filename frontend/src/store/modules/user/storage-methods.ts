import axios from 'axios';
import { UserModule } from "@/types/user-module";
import { Book } from '@/types/books-module';
import { BookMutations, BookActions } from '../books/storage-methods';
import { ActionTree, MutationTree } from 'vuex';
import { StoreType } from '@/store';
import { HttpClient } from '@/utils/http-client';
import { LoginData } from '@/types/authentication/login-data';
import { HttpError } from '@/types/http-error';
import { LoginResult } from '@/types/authentication/login-result';

export const state: UserModule = {
    loggedIn: false,
    id: 0,
    login: ''
};

export enum UserMutations {
    login = 'USER_login',
    loginError = 'USER_loginError',
    logout = 'USER_logout',
}

export enum UserActions {
    login = 'USER_login',
    logout = 'USER_logout',
}

export const mutations: MutationTree<UserModule> = {
    [UserMutations.login](state: UserModule, data: LoginResult) {
        state.loggedIn = true;
        state.id = data.id;
        state.login = data.login;
    },
    [UserMutations.loginError](state: UserModule, http: HttpError) {
        state.error = http;
    },
    [UserMutations.logout](state: UserModule) {
        state.loggedIn = false;
        state.login = '';
        state.id = 0;
        delete state.error;
    }
};

export const actions: ActionTree<UserModule, StoreType> = {
    async [UserMutations.login]({commit, dispatch}, data: LoginData): Promise<void> {
        const loginResponse = await new HttpClient().login(data);

        if(loginResponse.IsSuccess) {
            await dispatch(BookActions.loadBooks);

            commit(UserMutations.login, loginResponse.Data);
        } else {
            commit(UserMutations.loginError, loginResponse.Error);
        }
    },
    [UserMutations.logout]({commit}: any): void {
        commit(UserMutations.logout);
    }
};