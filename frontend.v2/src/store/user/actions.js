import {getLogger} from '../../logger';
import { USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION, USER_LOGIN_ACTION, USER_LOGOUT_ACTION, BOOKS_CLEAR_ACTION, BOOKS_LOAD_ACTION } from '../naming';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const actions = {
    [USER_LOGIN_ACTION]: async ({commit, dispatch}) => {
        commit(USER_LOGIN_MUTATION, {login: 'hrodvitnir'})
        await dispatch(BOOKS_LOAD_ACTION)
        logger.info('Logged in')
    },
    [USER_LOGOUT_ACTION]: async ({commit, dispatch}) => {
        await dispatch(BOOKS_CLEAR_ACTION)
        commit(USER_LOGOUT_MUTATION)
        logger.info('Logged out')
    }
}