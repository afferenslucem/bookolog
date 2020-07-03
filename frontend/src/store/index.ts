import Vue from 'vue';
import Vuex from 'vuex';

import userModule from './modules/user';
import booksModule from './modules/books';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    booksStorage: booksModule,
    user: userModule
  }
})
