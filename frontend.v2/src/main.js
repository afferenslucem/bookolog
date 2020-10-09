import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import join from '@/filters/join'
import wrap from '@/filters/wrap'
import dateFormat from '@/filters/format-date'
import capitalFirst from '@/filters/capital-first'
import i18n from './i18n'
import moment from 'moment';
import CloseListIcon from "@/components/icons/CloseListIcon.vue";
import OpenListIcon from "@/components/icons/OpenListIcon.vue";
import ShouldSyncIcon from "@/components/icons/ShouldSyncIcon.vue";
import PersonIcon from "@/components/icons/PersonIcon.vue";
import ConnectionMarker from "@/components/connection-module/ConnectionMarker.vue";
import TotalReadCount from "@/components/statistic-module/TotalReadBooksCount.vue";
import BookInlineHeader from "@/components/book-module/book/BookInlineHeader.vue";
import NoWrapValues from "@/components/book-module/book/NoWrapValues.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import ProgressBar from '@/components/book-module/book/ProgressBar.vue'; 

moment.locale('ru');
Vue.filter('join', join);
Vue.filter('dateFormat', dateFormat);
Vue.filter('wrap', wrap);
Vue.filter('capital', capitalFirst);

Vue.component('EditIcon', EditIcon);
Vue.component('ShouldSyncIcon', ShouldSyncIcon);
Vue.component('PersonIcon', PersonIcon);
Vue.component('ConnectionMarker', ConnectionMarker);
Vue.component('TotalReadCount', TotalReadCount);
Vue.component('BookInlineHeader', BookInlineHeader);
Vue.component('NoWrapValues', NoWrapValues);
Vue.component('ProgressBar', ProgressBar);
Vue.component('CloseListIcon', CloseListIcon);
Vue.component('OpenListIcon', OpenListIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')