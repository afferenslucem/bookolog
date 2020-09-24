import {getLogger} from '../../logger';
import { 
    CONNECTION_ONLINE_MUTATION, 
    CONNECTION_OFFLINE_MUTATION,
    CONNECTION_LOAD_FINISH_MUTATION,
    CONNECTION_LOAD_START_MUTATION,
} from '../naming';

const logger = getLogger({
    namespace: 'ConnectionModule',
    loggerName: 'Mutations'
});

export const mutations = {
    [CONNECTION_ONLINE_MUTATION]: (state) => {
        state.online = true;
        logger.debug('Online', state);
    },
    [CONNECTION_OFFLINE_MUTATION]: (state) => {
        state.online = false;
        logger.debug('Offline', state);
    },
    [CONNECTION_LOAD_START_MUTATION]: (state) => {
        state.loadingCounter = state.loadingCounter + 1;
        logger.debug('Loading started', state);
    },
    [CONNECTION_LOAD_FINISH_MUTATION]: (state) => {
        state.loadingCounter = Math.max(state.loadingCounter - 1, 0);
        logger.debug('Loading finished', state);
    },
}