import { StoreOptions, Module } from 'vuex';
import { UserModule } from '@/types/user-module';
import { state, mutations, actions } from './storage-methods';
import { StoreType } from '@/store';

const userModule: Module<UserModule, StoreType> = {
    state,
    mutations,
    actions
} as StoreOptions<UserModule>;

export default userModule;