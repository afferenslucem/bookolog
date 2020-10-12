import {
    USER_LOGGED_IN_GETTER
} from '@/store/naming';
import store from '@/store';
import {
    USER_RECOVER_ACTION,
} from '@/store/naming';


export default async (to, from, next) => {
    if (store.getters[USER_LOGGED_IN_GETTER]) {
        return next()
    } else {
        return store.dispatch(USER_RECOVER_ACTION).then((user) => {
            if (user) {
                next()
            } else {
                next({
                    name: 'Main'
                })
            }
        }).catch(() => next({
            name: 'Main'
        }));
    }
}