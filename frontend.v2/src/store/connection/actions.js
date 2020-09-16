import { 
    CONNECTION_ONLINE_MUTATION, 
    CONNECTION_OFFLINE_MUTATION,
    CONNECTION_OFFLINE_ACTION,
    CONNECTION_ONLINE_ACTION,
    BOOKS_SYNC_ACTION
} from '../naming';

export const actions = {
    [CONNECTION_ONLINE_ACTION]: async ({commit, dispatch, getters}) => {
        commit(CONNECTION_ONLINE_MUTATION)

        if (getters.offline) {
            await dispatch(BOOKS_SYNC_ACTION)
        }
    },
    [CONNECTION_OFFLINE_ACTION]: async ({commit}) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
}