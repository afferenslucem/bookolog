import {getLogger} from '../../logger';
import {
    CONNECTION_OFFLINE_ACTION,
    NETWORK_ERROR,
    USER_LOGIN_MUTATION,
    USER_LOGOUT_MUTATION,
    USER_RECOVER_ACTION,
    USER_LOGIN_ACTION,
    USER_LOGOUT_ACTION,
    BOOKS_CLEAR_ACTION,
    BOOKS_SYNC_ACTION,
    NOTIFICATION_DANGER_ACTION,
} from '../naming';
import { UserClient } from '../../http/user-client';
import i18n from '../../i18n';
import { UserSynchronizator } from './utils/user-syncronizator';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const actions = {
    [USER_LOGIN_ACTION]: async ({commit, dispatch}, {username, password}) => {
        try {
            const userClient = new UserClient();

            const user = await userClient.login(username, password);
    
            if (user == undefined) {
                dispatch(NOTIFICATION_DANGER_ACTION, i18n.t('auth.actions.login.error'));
                return;
            }

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
        const recoveredUser = await new UserSynchronizator().getCurrentUser();

        if(recoveredUser) {
            commit(USER_LOGIN_MUTATION, recoveredUser)

            await dispatch(BOOKS_SYNC_ACTION)

            logger.info('Logged in', recoveredUser)

            return recoveredUser;
        } else {
            return null;
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