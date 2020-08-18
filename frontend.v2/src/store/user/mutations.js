import {getLogger} from '../../logger';
import { USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION } from '../naming';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [USER_LOGIN_MUTATION]: (state, payload) => {
        logger.debug('Logged in')
        state.login = payload.login
    },
    [USER_LOGOUT_MUTATION]: (state) => {
        logger.debug('Logged out')
        state.login = ''
    }
}