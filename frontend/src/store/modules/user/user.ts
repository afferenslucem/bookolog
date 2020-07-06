import { StoreOptions } from 'vuex';
import { UserModule } from '@/types/user-module';
import { state, mutations, actions } from './storage-methods';

const userModule = {
    state,
    mutations,
    actions
} as StoreOptions<UserModule>;

export default userModule;