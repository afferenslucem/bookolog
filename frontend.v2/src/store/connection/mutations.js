import {getLogger} from '../../logger';
import { 
    CONNECTION_ONLINE_MUTATION, 
    CONNECTION_OFFLINE_MUTATION 
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
    }
}