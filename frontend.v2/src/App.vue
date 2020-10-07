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

import { getLogger } from "@/logger";

const clientLogger = getLogger({
  namespace: "Http",
  loggerName: "Client",
});

export default {
  async created() {
    Client.prototype.onSuccess = () => this.turnOnline();
    Client.prototype.onNetworkError = () => this.turnOffline();
    Client.prototype.onUnauthorizedError = () =>
      this.$store.dispatch(USER_LOGOUT_ACTION);
    Client.prototype.requestCanceled = () => this.hideLoader();
    Client.prototype.requestStarted = () => this.showLoader();
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
    showLoader() {
      clientLogger.debug("showLoader");
      this.$store.dispatch(CONNECTION_LOAD_START_ACTION);
    },
    hideLoader() {
      clientLogger.debug("hideLoader");
      this.$store.dispatch(CONNECTION_LOAD_FINISH_ACTION);
    },
    turnOffline() {
      clientLogger.debug("turnOffline");
      return this.$store.dispatch(CONNECTION_OFFLINE_ACTION);
    },
    async turnOnline() {
      try {
        clientLogger.debug("turnOnline");
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
