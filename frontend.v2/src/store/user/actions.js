import {getLogger} from '../../logger';
import { USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION, USER_LOGIN_ACTION, USER_LOGOUT_ACTION } from '../naming';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const actions = {
    [USER_LOGIN_ACTION]: async ({commit}) => {
        commit(USER_LOGIN_MUTATION, {login: 'hrodvitnir'})
        logger.info('Logged in')
    },
    [USER_LOGOUT_ACTION]: async ({commit}) => {
        commit(USER_LOGOUT_MUTATION)
        logger.info('Logged out')
    }
}