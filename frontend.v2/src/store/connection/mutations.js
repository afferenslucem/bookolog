import { 
    CONNECTION_ONLINE_MUTATION, 
    CONNECTION_OFFLINE_MUTATION,
    CONNECTION_LOAD_FINISH_MUTATION,
    CONNECTION_LOAD_START_MUTATION,
    CONNECTION_SAVE_LOAD_TIMER_MUTATION,
    CONNECTION_REMOVE_LOAD_TIMER_NUTATION,
} from '../naming';

import Vue from 'vue';

export const mutations = {
    [CONNECTION_ONLINE_MUTATION]: (state) => {
        state.online = true;
    },
    [CONNECTION_OFFLINE_MUTATION]: (state) => {
        state.online = false;
    },
    [CONNECTION_LOAD_START_MUTATION]: (state) => {
        state.loadingCounter = state.loadingCounter + 1;
    },
    [CONNECTION_LOAD_FINISH_MUTATION]: (state) => {
        state.loadingCounter = state.loadingCounter - 1;
    },
    [CONNECTION_SAVE_LOAD_TIMER_MUTATION]: (state, {timer, guid}) => {
        Vue.set(state.timers, guid, timer);
    },
    [CONNECTION_REMOVE_LOAD_TIMER_NUTATION]: (state, guid) => {
        Vue.delete(state.timers, guid);
    },
}