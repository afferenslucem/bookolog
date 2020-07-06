import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user/user';
import booksStorage from './modules/books/books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // @ts-ignore 
    booksStorage,
    // @ts-ignore 
    user
  }
})
