<template>
  <div id="app">
    <notification-message></notification-message>
    <router-view />
    <app-loader></app-loader>
  </div>
</template>

<script>
import {
  CONNECTION_ONLINE_ACTION,
  CONNECTION_OFFLINE_ACTION,
  USER_LOGOUT_ACTION,
  CONNECTION_LOAD_START_ACTION,
  CONNECTION_LOAD_FINISH_ACTION,
} from "@/store/naming";

import AppLoader from "@/components/connection-module/Loader.vue";
import NotificationMessage from "@/components/notification-module/Message.vue";

import { Client } from "@/http/client";

export default {
  async created() {
    Client.prototype.onSuccess = () => this.turnOnline();
    Client.prototype.onNetworkError = () => this.turnOffline();
    Client.prototype.onUnauthorizedError = () =>
      this.$store.dispatch(USER_LOGOUT_ACTION);
    Client.prototype.requestCanceled = (requestGuid) => this.hideLoader(requestGuid);
    Client.prototype.requestStarted = (requestGuid) => this.showLoader(requestGuid);
    Client.prototype.retry = 2;
  },
  components: {
    AppLoader,
    NotificationMessage,
  },
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    showLoader(requestGuid) {
      this.$store.dispatch(CONNECTION_LOAD_START_ACTION, requestGuid);
    },
    hideLoader(requestGuid) {
      this.$store.dispatch(CONNECTION_LOAD_FINISH_ACTION, requestGuid);
    },
    turnOffline() {
      return this.$store.dispatch(CONNECTION_OFFLINE_ACTION);
    },
    async turnOnline() {
      try {
        await this.$store.dispatch(CONNECTION_ONLINE_ACTION);
      } catch (e) {
        //
      }
    },
  },
};
</script>

<style lang="scss">
@import "styles";
</style>
