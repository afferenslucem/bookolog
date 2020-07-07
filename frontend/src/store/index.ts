import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user/user';
import booksStorage from './modules/books/books';
import { BooksModule } from '@/types/books-module';
import { UserModule } from '@/types/user-module';

Vue.use(Vuex);

export interface StoreType extends BooksModule, UserModule {
}

export default new Vuex.Store<StoreType>({
  modules: {
    booksStorage,
    user
  }
})
