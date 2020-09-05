import {getLogger} from '../../logger';
import { USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION, USER_LOGIN_ACTION, USER_LOGOUT_ACTION, BOOKS_CLEAR_ACTION, BOOKS_LOAD_ACTION } from '../naming';
import { UserClient } from '../../http/user-client';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const actions = {
    [USER_LOGIN_ACTION]: async ({commit, dispatch}, {username, password}) => {
        logger.debug('User data:', {
            username,
            password
        });

        const userClient = new UserClient();

        try {
            const result = userClient.login(username, password);

            commit(USER_LOGIN_MUTATION, {login: result.login})

            await dispatch(BOOKS_LOAD_ACTION)
            logger.info('Logged in', result)

            return result;
        } catch(e) {
            throw new Error(e)
        }
    },
    [USER_LOGOUT_ACTION]: async ({commit, dispatch}) => {
        await dispatch(BOOKS_CLEAR_ACTION)
        commit(USER_LOGOUT_MUTATION)
        logger.info('Logged out')
    }
}