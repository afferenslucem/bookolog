export const USER_LOGGED_IN = 'USER_LOGGED_IN';

export const getters = {
    [USER_LOGGED_IN]: state => !!state.login.trim()
}