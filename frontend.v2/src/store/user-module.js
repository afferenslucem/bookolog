import {getLogger} from '../logger';

const logger = getLogger('UserModule');

export default {
    namespaced: true,
    state: () => ({
        login: '', 
    }),
    getters: {
        loggedIn: state => state.login !== ''
    },
    mutations: {
        loggedIn: (state, userData) => {
            logger.debug('loggedIn', userData);
        },
        logout: state => {
            state.login = ''
        }
    }
}