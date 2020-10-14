import {
    USER_RECOVER_ACTION
} from '@/store/naming';
import store from '@/store';

export default async (to, from, next) => {
    const user = await store.dispatch(USER_RECOVER_ACTION);

    if(user) {
        next({name: 'InProgress'});
    } else {
        next();
    }
}