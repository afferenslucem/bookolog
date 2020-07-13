import { UserModule } from "@/types/user-module";
import { BookActions } from '../books/storage-methods';
import { ActionTree, MutationTree } from 'vuex';
import { StoreType } from '@/store';
import { HttpClient } from '@/utils/http-client';
import { LoginData } from '@/types/authentication/login-data';
import { HttpError } from '@/types/http-error';
import { LoginResult } from '@/types/authentication/login-result';

export const state: UserModule = {
    loggedIn: false,
    id: 0,
    login: '',
    error: {} as HttpError
};

export enum UserMutations {
    setUser = 'USER_login',
    loginError = 'USER_loginError',
    removeUser = 'USER_logout',
}

export enum UserActions {
    login = 'USER_login',
    logout = 'USER_logout',
    isLoggedIn = 'USER_isLoggedIn',
    onLoggedIn = 'USER_onLoggedIn',
}

export const mutations: MutationTree<UserModule> = {
    [UserMutations.setUser](state: UserModule, data: LoginResult) {
        state.loggedIn = true;
        state.id = data.id;
        state.login = data.login;
    },
    [UserMutations.loginError](state: UserModule, http: HttpError) {
        state.error = http;
    },
    [UserMutations.removeUser](state: UserModule) {
        state.loggedIn = false;
        state.login = '';
        state.id = 0;
        delete state.error;
    }
};

export const actions: ActionTree<UserModule, StoreType> = {
    async [UserActions.login]({commit, dispatch}, data: LoginData): Promise<void> {
        const loginResponse = await new HttpClient().login(data);

        if(loginResponse.IsSuccess) {
            await dispatch(UserActions.onLoggedIn, loginResponse.Data);
        } else {
            commit(UserMutations.loginError, loginResponse.Error);
        }
    },
    [UserActions.logout]({commit}: any): void {
        commit(UserMutations.removeUser);
    },
    async [UserActions.isLoggedIn]({dispatch}: any): Promise<boolean> {
        const loggedInResponse = await new HttpClient().isLoggedIn();

        if(loggedInResponse.IsSuccess) {
            await dispatch(UserActions.onLoggedIn, loggedInResponse.Data);
            return true;
        } else return false;
    },
    async [UserActions.onLoggedIn]({commit, dispatch}, user: LoginData): Promise<void> {
        await dispatch(BookActions.loadBooks);

        commit(UserMutations.setUser, user);
    }
};