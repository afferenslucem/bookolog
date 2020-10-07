import {
    CONNECTION_ONLINE_MUTATION,
    CONNECTION_OFFLINE_MUTATION,
    CONNECTION_OFFLINE_ACTION,
    CONNECTION_ONLINE_ACTION,
    BOOKS_SYNC_ACTION,
    CONNECTION_LOAD_START_ACTION,
    CONNECTION_LOAD_FINISH_ACTION,
    CONNECTION_LOAD_START_MUTATION,
    CONNECTION_LOAD_FINISH_MUTATION,
    CONNECTION_SAVE_LOAD_TIMER_MUTATION,
    CONNECTION_REMOVE_LOAD_TIMER_NUTATION,
} from '../naming';
import {
    Timer
} from "essents";

export const actions = {
    [CONNECTION_ONLINE_ACTION]: async ({
        commit,
        dispatch,
        getters
    }) => {
        const wasOffline = getters.offline;

        commit(CONNECTION_ONLINE_MUTATION)

        if (wasOffline) {
            await dispatch(BOOKS_SYNC_ACTION)
        }
    },
    [CONNECTION_OFFLINE_ACTION]: async ({
        commit
    }) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
    [CONNECTION_OFFLINE_ACTION]: async ({
        commit
    }) => {
        commit(CONNECTION_OFFLINE_MUTATION)
    },
    [CONNECTION_LOAD_START_ACTION]: async ({
        commit
    }, guid) => {
        const timer = new Timer(() => commit(CONNECTION_LOAD_START_MUTATION), 200).start();

        commit(CONNECTION_SAVE_LOAD_TIMER_MUTATION, {
            guid,
            timer
        });
    },
    [CONNECTION_LOAD_FINISH_ACTION]: async ({
        state,
        commit
    }, guid) => {
        const timer = state.timers[guid];

        if(!timer.routineStarted) {
            timer.kill();
        } else {
            new Timer(() => commit(CONNECTION_LOAD_FINISH_MUTATION), 250).start();
        }

        commit(CONNECTION_REMOVE_LOAD_TIMER_NUTATION, guid);
    },
}