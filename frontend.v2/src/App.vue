<template>
  <div id="app">
    <notification-message></notification-message>
    <router-view />
    <app-loader></app-loader>
  </div>
</template>

<script>
import {
  USER_RECOVER_ACTION,
} from '@/store/naming';
import {
  CONNECTION_ONLINE_ACTION,
  CONNECTION_OFFLINE_ACTION,
  USER_LOGOUT_ACTION,
  CONNECTION_LOAD_START_MUTATION,
  CONNECTION_LOAD_FINISH_MUTATION,
} from "@/store/naming";

import AppLoader from "@/components/connection-module/Loader.vue";
import NotificationMessage from "@/components/notification-module/Message.vue";

import { Client } from "@/http/client";

import { Timer } from "essents";

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
      loadingTimer: new Timer(() => {
        this.$store.commit(CONNECTION_LOAD_START_MUTATION);
      }, 100),
      hideLoadingTimer: new Timer(() => {
        this.$store.commit(CONNECTION_LOAD_FINISH_MUTATION);
      }, 200),
      checked: false,
    };
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
    },
    turnOffline() {
      return this.$store.dispatch(CONNECTION_OFFLINE_ACTION);
    },
    turnOnline() {
      return this.$store.dispatch(CONNECTION_ONLINE_ACTION);
    },
  },
  async beforeCreate() {
    const user = await this.$store.dispatch(USER_RECOVER_ACTION);
    if (user) {
      this.$router.push({ name: "InProgress" });
    }
  },
};
</script>

<style lang="scss">
@import "styles";
</style>
