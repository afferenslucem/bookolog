import { StoreOptions } from 'vuex';
import { UserModule } from '@/types/user-module';

const userModule = {  
    state: {
        loggedIn: false
    },
    mutations: {
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
        }
    },
    getters: {

    }
} as StoreOptions<UserModule>;

export default userModule;