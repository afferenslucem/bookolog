import { 
    NOTIFICATION_WARNING_ACTION, 
    NOTIFICATION_SUCCESS_ACTION,
    NOTIFICATION_DANGER_ACTION,
    NOTIFICATION_INFO_ACTION,
    NOTIFICATION_SHOW_MUTATION,
    NOTIFICATION_HIDE_MUTATION,
    NOTIFICATION_SHOW_ACTION,
} from '../naming';

import {
    NOTIFICATION_SUCCESS_TYPE,
    NOTIFICATION_DANGER_TYPE,
    NOTIFICATION_WARN_TYPE,
    NOTIFICATION_INFO_TYPE,
} from '@/models/notification.js';

import {Timer} from 'essents';
import { NOTIFICATION_SHOW_TIME } from '../../config';

export const actions = {
    [NOTIFICATION_WARNING_ACTION]: async ({dispatch}, text) => {
        dispatch(NOTIFICATION_SHOW_MUTATION, {
            type: NOTIFICATION_WARN_TYPE,
            text 
        });
    },
    [NOTIFICATION_SUCCESS_ACTION]: async ({dispatch}, text) => {
        dispatch(NOTIFICATION_SHOW_MUTATION, {
            type: NOTIFICATION_SUCCESS_TYPE,
            text 
        });
    },
    [NOTIFICATION_DANGER_ACTION]: async ({dispatch}, text) => {
        dispatch(NOTIFICATION_SHOW_MUTATION, {
            type: NOTIFICATION_DANGER_TYPE,
            text 
        });
    },
    [NOTIFICATION_INFO_ACTION]: async ({dispatch}, text) => {
        dispatch(NOTIFICATION_SHOW_MUTATION, {
            type: NOTIFICATION_INFO_TYPE,
            text 
        });
    },
    [NOTIFICATION_SHOW_ACTION]: async ({commit}, payload) => {
        commit(NOTIFICATION_SHOW_MUTATION, payload);

        new Timer(() => {
            commit(NOTIFICATION_HIDE_MUTATION);
        }, NOTIFICATION_SHOW_TIME).start();
    },
}