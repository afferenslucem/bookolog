import { 
    CONNECTION_ONLINE_MUTATION, 
    CONNECTION_OFFLINE_MUTATION,
    CONNECTION_OFFLINE_ACTION,
    CONNECTION_ONLINE_ACTION,
    BOOKS_SYNC_ACTION,
    CONNECTION_LOAD_START_ACTION,
    CONNECTION_LOAD_FINISH_ACTION,
    CONNECTION_LOAD_START_MUTATION,
    CONNECTION_LOAD_FINISH_MUTATION
} from '../naming';
import { Timer } from "essents";

export const actions = {
    [CONNECTION_ONLINE_ACTION]: async ({commit, dispatch, getters}) => {
        const wasOffline = getters.offline;

        commit(CONNECTION_ONLINE_MUTATION)

        if (wasOffline) {
            await dispatch(BOOKS_SYNC_ACTION)
        }
    },
    [CONNECTION_OFFLINE_ACTION]: async ({commit}) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
    [CONNECTION_OFFLINE_ACTION]: async ({commit}) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
    [CONNECTION_LOAD_START_ACTION]: async ({commit}) => {
        new Timer(() => {
            commit(CONNECTION_LOAD_START_MUTATION);
        }, 150).start();
    },
    [CONNECTION_LOAD_FINISH_ACTION]: async ({commit}) => {
        new Timer(() => {
            commit(CONNECTION_LOAD_FINISH_MUTATION)
        }, 400).start();
    },
}