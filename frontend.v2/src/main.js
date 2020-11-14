import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import join from '@/filters/join'
import wrap from '@/filters/wrap'
import dateFormat from '@/filters/format-date'
import capitalFirst from '@/filters/capital-first'
import chooseForm from '@/filters/choose-form'
import unitsToTime from '@/filters/units-to-time'
import i18n from './i18n'
import moment from 'moment';
import CameraIcon from "@/components/icon/CameraIcon.vue";
import CloseListIcon from "@/components/icon/CloseListIcon.vue";
import OpenListIcon from "@/components/icon/OpenListIcon.vue";
import ShouldSyncIcon from "@/components/icon/ShouldSyncIcon.vue";
import CrossIcon from "@/components/icon/CrossIcon.vue";
import PersonIcon from "@/components/icon/PersonIcon.vue";
import ConnectionMarker from "@/components/connection/ConnectionMarker.vue";
import TotalReadCount from "@/components/statistic/TotalReadBooksCount.vue";
import BookInlineHeader from "@/components/book/book/BookInlineHeader.vue";
import BookDateRange from "@/components/book/book/BookDateRange.vue";
import BookPageProgress from "@/components/book/book/BookPageProgress.vue";
import BookTimeProgress from "@/components/book/book/BookTimeProgress.vue";
import NoWrapValues from "@/components/book/book/NoWrapValues.vue";
import EditIcon from "@/components/icon/EditIcon.vue";
import ProgressBar from '@/components/book/book/ProgressBar.vue';
import ProfilePic from '@/components/user/ProfilePic.vue';

moment.locale('ru');
Vue.filter('join', join);
Vue.filter('dateFormat', dateFormat);
Vue.filter('wrap', wrap);
Vue.filter('capital', capitalFirst);
Vue.filter('formify', chooseForm);
Vue.filter('timify', unitsToTime);

Vue.component('CameraIcon', CameraIcon);
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
Vue.component('CrossIcon', CrossIcon);
Vue.component('ProfilePic', ProfilePic);
Vue.component('BookDateRange', BookDateRange);
Vue.component('BookPageProgress', BookPageProgress);
Vue.component('BookTimeProgress', BookTimeProgress);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
