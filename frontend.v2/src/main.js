import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import join from './filters/join'
import capitalFirst from './filters/capital-first'

Vue.filter('join', join);
Vue.filter('capital', capitalFirst);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
