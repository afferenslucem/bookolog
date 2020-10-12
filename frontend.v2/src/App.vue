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
  USER_RECOVER_ACTION,
} from "@/store/naming";

import {
  HTTP_TRYOUTS_COUNT,
  HTTP_REQUEST_TIMEOUT_MS,
} from './config'

import AppLoader from "@/components/connection-module/Loader.vue";
import NotificationMessage from "@/components/notification-module/Message.vue";

import { Client } from "@/http/client";

export default {
  async created() {
    this.$store.dispatch(USER_RECOVER_ACTION).then((user) => {
      if (user) {
          this.$router.push({name: 'InProgress'});
      } 
    });
    Client.prototype.onSuccess = () => this.turnOnline();
    Client.prototype.onNetworkError = () => this.turnOffline();
    Client.prototype.onUnauthorizedError = () =>
      this.$store.dispatch(USER_LOGOUT_ACTION);
    Client.prototype.requestCanceled = (requestGuid) => this.hideLoader(requestGuid);
    Client.prototype.requestStarted = (requestGuid) => this.showLoader(requestGuid);
    Client.prototype.retry = HTTP_TRYOUTS_COUNT - 1;
    Client.prototype.timeout = HTTP_REQUEST_TIMEOUT_MS;
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
