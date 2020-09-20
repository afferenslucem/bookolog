import {getLogger} from '../../logger';
import { CONNECTION_OFFLINE_ACTION, NETWORK_ERROR, USER_LOGIN_MUTATION, USER_LOGOUT_MUTATION, USER_RECOVER_ACTION, USER_LOGIN_ACTION, USER_LOGOUT_ACTION, BOOKS_CLEAR_ACTION, BOOKS_SYNC_ACTION } from '../naming';
import { UserClient } from '../../http/user-client';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const actions = {
    [USER_LOGIN_ACTION]: async ({commit, dispatch}, {username, password}) => {
        try {
            const userClient = new UserClient();

            const user = await userClient.login(username, password);
    
            localStorage.setItem('user', JSON.stringify(user));
    
            commit(USER_LOGIN_MUTATION, user)
    
            return user;
        } catch(e) {
            if(e == NETWORK_ERROR) {
                await dispatch(CONNECTION_OFFLINE_ACTION)
            }
            throw e;
        }
    },
    [USER_RECOVER_ACTION]: async ({commit, dispatch}) => {
        const savedUser = localStorage.getItem('user');

        if(savedUser) {
            const user = JSON.parse(savedUser);
            commit(USER_LOGIN_MUTATION, user)

            await dispatch(BOOKS_SYNC_ACTION)

            logger.info('Logged in', user)

            return user;
        } else {
            return;
        }
    },
    [USER_LOGOUT_ACTION]: async ({commit, dispatch}) => {
        await new UserClient().logout();

        localStorage.clear();
        sessionStorage.clear();

        await dispatch(BOOKS_CLEAR_ACTION)

        commit(USER_LOGOUT_MUTATION)
        
        logger.info('Logged out')
    }
}