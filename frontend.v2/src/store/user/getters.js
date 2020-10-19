import {
    USER_LOGGED_IN_GETTER
} from '../naming';
import {
    getLogger
} from '../../logger';

const logger = getLogger({
    namespace: 'UserModule',
    loggerName: 'Actions'
});

export const getters = {
    [USER_LOGGED_IN_GETTER]: state => {
        const result = !!state.login;

        logger.info(`Is logged in: ${result}`, {
            id: state.id,
            login: state.login,
            email: state.email,
        });

        return result;
    }
}