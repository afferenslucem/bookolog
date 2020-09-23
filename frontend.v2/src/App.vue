<template>
  <div id="app">
    <notification-message></notification-message>
    <router-view/>
    <app-loader></app-loader>
  </div>
</template>

<script>
import {
  CONNECTION_ONLINE_ACTION,
  CONNECTION_OFFLINE_ACTION,
  USER_RECOVER_ACTION,
  USER_LOGOUT_ACTION,
  CONNECTION_LOAD_START_MUTATION,
  CONNECTION_LOAD_FINISH_MUTATION,
} from '@/store/naming';

import AppLoader from '@/components/connection-module/Loader.vue';
import NotificationMessage from '@/components/notification-module/Message.vue';

import {
  Client
} from '@/http/client';

import { Timer } from 'essents';

export default {
  async created() {
    Client.prototype.onSuccess = () => this.$store.dispatch(CONNECTION_ONLINE_ACTION);
    Client.prototype.onNetworkError = () => this.$store.dispatch(CONNECTION_OFFLINE_ACTION);
    Client.prototype.onUnauthorizedError = () => this.$store.dispatch(USER_LOGOUT_ACTION);
    Client.prototype.requestCanceled = () => this.hideLoader();
    Client.prototype.requestStarted = () => this.showLoader();

    await this.$store.dispatch(USER_RECOVER_ACTION)
  },
  components: {
    AppLoader,
    NotificationMessage,
  },
  data() {
    return ({
      loadingTimer: new Timer(() => {
        this.$store.commit(CONNECTION_LOAD_START_MUTATION);
      }, 100),
      hideLoadingTimer: new Timer(() => {
        this.$store.commit(CONNECTION_LOAD_FINISH_MUTATION);
      }, 75),
    });
  },
  methods: {
    showLoader() {
      this.loadingTimer.start();
      this.$forceUpdate();
    },
    hideLoader() {
      this.loadingTimer.kill();
      this.$forceUpdate();
      this.hideLoadingTimer.start();
    }
  }
}
</script>

<style lang="scss">
  @import 'styles';
</style>
