import {
    USER_LOGIN_MUTATION,
    USER_LOGOUT_MUTATION,
    USER_SET_EMAIL_MUTATION,
    USER_SET_AVATAR_MUTATION
} from '../naming';


export const mutations = {
    [USER_LOGIN_MUTATION]: (state, payload) => {
        state.login = payload.login;
        state.id = payload.id;
        state.email = payload.email;
        state.avatar = payload.avatarName;
    },
    [USER_SET_EMAIL_MUTATION]: (state, email) => {
        state.email = email;
    },
    [USER_SET_AVATAR_MUTATION]: (state, avatar) => {
        state.avatar = avatar;
    },
    [USER_LOGOUT_MUTATION]: (state) => {
        state.login = null;
        state.id = null;
        state.email = null;
        state.avatar = null;
    }
}