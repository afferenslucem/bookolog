export const USER_LOGIN_MUTATION = 'USER_LOGIN_MUTATION';
export const USER_LOGOUT_MUTATION = 'USER_LOGOUT_MUTATION';

export const mutations = {
    [USER_LOGIN_MUTATION]: (state, payload) => {
        state.login = payload.login
    },
    [USER_LOGOUT_MUTATION]: (state) => {
        state.login = ''
    }
}