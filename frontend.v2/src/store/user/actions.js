import {
    getLogger
} from '@/logger';
import {
    CONNECTION_OFFLINE_ACTION,
    NETWORK_ERROR,
    USER_LOGIN_MUTATION,
    USER_LOGOUT_MUTATION,
    USER_RECOVER_ACTION,
    USER_SYNC_DATA_ACTION,
    USER_INIT_DATA_ACTION,
    USER_SYNC_BOOKS_ACTION,
    USER_LOGIN_ACTION,
    USER_LOGOUT_ACTION,
    BOOKS_CLEAR_ACTION,
    BOOKS_SYNC_ACTION,
    BOOKS_LOAD_LOCAL_ACTION,
    BOOKS_LOAD_ACTION,
    NOTIFICATION_DANGER_ACTION,
    NOTIFICATION_WARNING_ACTION,
    USER_SAVE_ACTION,
} from '../naming';
import {
    UserClient
} from '../../http/user-client';
import i18n from '../../i18n';
import {
    UserSynchronizator
} from './utils/user-syncronizator';
import {
    getUtcDate
} from '@/utils/utc-date';
import {
    BOOK_RELOAD_TIMEOUT_SECONDS,
    BOOK_RELOAD_DELAY_SECONDS,
} from '@/config';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

function dateSecondDiff(first, second) {
    const date1 = new Date(first);
    const date2 = new Date(second);

    const diff = date1.getTime() - date2.getTime();

    return Math.abs(diff) / 1000;
}

function getSyncDiffTime(user) {
    const now = getUtcDate();
    const syncDiffTime = dateSecondDiff(user.lastSyncTime, now);

    return syncDiffTime;
}

export const actions = {
    [USER_LOGIN_ACTION]: async ({
        dispatch
    }, payload) => {
        try {
            logger.info('login', payload.username)

            const user = await dispatch('sendLogin', payload);

            if (user == undefined) {
                dispatch(NOTIFICATION_DANGER_ACTION, i18n.t('auth.actions.login.error'));
                return;
            }

            dispatch(USER_SAVE_ACTION, user);

            await dispatch(BOOKS_LOAD_ACTION)

            return user;
        } catch (e) {
            if (e == NETWORK_ERROR) {
                await dispatch(CONNECTION_OFFLINE_ACTION)
            }
            throw e;
        }
    },
    [USER_RECOVER_ACTION]: async ({
        dispatch
    }) => {
        try {
            const recoveredUser = dispatch('getLocalStoredUser');
            
            logger.info('Recover user', recoveredUser)

            return recoveredUser;
        } catch (e) {
            logger.info('Could not recover user')

            return null;
        }
    },
    [USER_SYNC_DATA_ACTION]: async ({
        dispatch
    }) => {

        try {
            logger.info('Sync user')

            const userCurrentState = await dispatch('getRemoteUser');
            
            logger.info('User current state', userCurrentState);

            dispatch(USER_SAVE_ACTION, userCurrentState);

            const syncDiffTime = getSyncDiffTime(userCurrentState);

            if (syncDiffTime < BOOK_RELOAD_DELAY_SECONDS) return;

            await dispatch(USER_SYNC_BOOKS_ACTION, userCurrentState);

            logger.info('Synced user')

        } catch (e) {
            if (e == NETWORK_ERROR) {
                const recoveredUser = await dispatch('getLocalStoredUser');
                const restoreAwait = dispatch(BOOKS_LOAD_LOCAL_ACTION);
                dispatch(USER_SAVE_ACTION, recoveredUser);
                await restoreAwait;

                dispatch(NOTIFICATION_WARNING_ACTION, i18n.t('sync.offline'));
            }
            throw e;
        }
    },
    [USER_INIT_DATA_ACTION]: async ({
        dispatch
    }) => {
        try {
            logger.info('Init app')

            const userCurrentState = await dispatch('getRemoteUser');
            logger.info('User current state', userCurrentState);
            dispatch(USER_SAVE_ACTION, userCurrentState);            

            await dispatch(USER_SYNC_BOOKS_ACTION, userCurrentState);

            logger.info('App inited')
        } catch (e) {
            if (e == NETWORK_ERROR) {
                const recoveredUser = await dispatch('getLocalStoredUser');
                const restoreAwait = dispatch(BOOKS_LOAD_LOCAL_ACTION);
                dispatch(USER_SAVE_ACTION, recoveredUser);
                await restoreAwait;

                dispatch(NOTIFICATION_WARNING_ACTION, i18n.t('sync.offline'));
            }
            throw e;
        }
    },
    [USER_SYNC_BOOKS_ACTION]: async ({
        dispatch
    }, user) => {
        const syncDiffTime = getSyncDiffTime(user);

        if (syncDiffTime > BOOK_RELOAD_TIMEOUT_SECONDS) {
            await dispatch(BOOKS_LOAD_ACTION);
        } else {
            await dispatch(BOOKS_SYNC_ACTION)
        }
    },
    [USER_SAVE_ACTION]({
        commit
    }, user) {
        localStorage.setItem('user', JSON.stringify(user));

        commit(USER_LOGIN_MUTATION, user)
    },
    [USER_LOGOUT_ACTION]: async ({
        commit,
        dispatch
    }) => {
        await new UserClient().logout();

        localStorage.clear();
        sessionStorage.clear();

        await dispatch(BOOKS_CLEAR_ACTION)

        commit(USER_LOGOUT_MUTATION)

        logger.info('Logged out')
    },

    async getRemoteUser() {
        return await new UserClient().me();
    },

    getLocalStoredUser() {
        return new UserSynchronizator().getLocalStoredUser();
    },

    async sendLogin(context, {
        username,
        password
    }) {
        const userClient = new UserClient();
        return await userClient.login(username, password);
    }
}