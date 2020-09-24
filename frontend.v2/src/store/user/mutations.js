import {
    getLogger
} from '../../logger';
import {
    USER_LOGIN_MUTATION,
    USER_LOGOUT_MUTATION,
    USER_SET_EMAIL_MUTATION
} from '../naming';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [USER_LOGIN_MUTATION]: (state, payload) => {
        state.login = payload.login;
        state.id = payload.id;
        state.email = payload.email;
        logger.debug('Logged in', payload);
        logger.debug('State', state);
    },
    [USER_SET_EMAIL_MUTATION]: (state, email) => {
        state.email = email;
    },
    [USER_LOGOUT_MUTATION]: (state) => {
        state.login = '';
        logger.debug('Logged out');
    }
}