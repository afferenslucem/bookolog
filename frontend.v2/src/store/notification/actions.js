import { 
    NOTIFICATION_WARNING_ACTION, 
    NOTIFICATION_SUCCESS_ACTION,
    NOTIFICATION_DANGER_ACTION,
    NOTIFICATION_INFO_ACTION,
    NOTIFICATION_HIDE_MUTATION,
    NOTIFICATION_SHOW_MUTATION,
} from '../naming';

export const actions = {
    [CONNECTION_ONLINE_ACTION]: async ({commit, dispatch}) => {
        
    },
    [CONNECTION_OFFLINE_ACTION]: async ({commit}) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
}