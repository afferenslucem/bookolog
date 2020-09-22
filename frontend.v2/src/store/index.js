import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import book from './book'
import connection from './connection';
import notification from './notification';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    book,
    connection,
    notification,
  }
});