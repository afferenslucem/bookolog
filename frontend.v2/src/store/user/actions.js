import {
    getLogger
} from '../../logger';
import {
    CONNECTION_OFFLINE_ACTION,
    NETWORK_ERROR,
    USER_LOGIN_MUTATION,
    USER_LOGOUT_MUTATION,
    USER_RECOVER_ACTION,
    USER_SYNC_DATA_ACTION,
    USER_SYNC_BOOKS_ACTION,
    USER_LOGIN_ACTION,
    USER_LOGOUT_ACTION,
    BOOKS_CLEAR_ACTION,
    BOOKS_SYNC_ACTION,
    BOOKS_LOAD_ACTION,
    NOTIFICATION_DANGER_ACTION,
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
    BOOK_RELOAD_TIMEOUT_HOURS
} from '@/config';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

function dateHoursDiff(first, second) {
    const date1 = new Date(first);
    const date2 = new Date(second);

    const diff = date1.getTime() - date2.getTime();

    return diff / 1000 / 60 / 60;
}

export const actions = {
    [USER_LOGIN_ACTION]: async ({
        dispatch
    }, {
        username,
        password
    }) => {
        try {
            const userClient = new UserClient();

            const user = await userClient.login(username, password);

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
    [USER_RECOVER_ACTION]: async () => {
        try {
            const recoveredUser = await new UserSynchronizator().getStoredUser();

            return recoveredUser;
        } catch (e) {
            return null;
        }
    },
    [USER_SYNC_BOOKS_ACTION]: async ({
        dispatch
    }, user) => {
        try {
            const now = getUtcDate();

            if (dateHoursDiff(user.lastSyncDate, now) > BOOK_RELOAD_TIMEOUT_HOURS) {
                await dispatch(BOOKS_LOAD_ACTION);
            } else {
                await dispatch(BOOKS_SYNC_ACTION)
            }

        } catch (e) {
            return null;
        }
    },
    [USER_SYNC_DATA_ACTION]: async ({
        dispatch
    }) => {
        const recoveredUser = await new UserSynchronizator().getStoredUser();

        await dispatch(USER_SYNC_BOOKS_ACTION, recoveredUser);

        const userCurrentState = await new UserClient().me();

        dispatch(USER_SAVE_ACTION, userCurrentState);
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
    }
}