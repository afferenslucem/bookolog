import {
    NOTIFICATION_SHOW_MUTATION,
    NOTIFICATION_HIDE_MUTATION,
} from '../naming';

export const mutations = {
    [NOTIFICATION_SHOW_MUTATION]: (state, payload) => {
        state.type = payload.type;
        state.text = payload.text;
        state.show = true;
    },

    [NOTIFICATION_HIDE_MUTATION]: (state) => {
        state.show = false;
    },
}