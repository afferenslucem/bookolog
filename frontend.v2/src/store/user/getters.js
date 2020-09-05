import {USER_LOGGED_IN_GETTER} from '../naming';

export const getters = {
    [USER_LOGGED_IN_GETTER]: state => !!state.login
}