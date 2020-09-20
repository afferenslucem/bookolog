import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import join from './filters/join'
import capitalFirst from './filters/capital-first'
import i18n from './i18n'

Vue.filter('join', join);
Vue.filter('capital', capitalFirst);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
