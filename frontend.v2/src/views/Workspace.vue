<template>
  <router-view></router-view>
</template>

<script>
import { USER_INIT_DATA_ACTION } from "@/store/naming";
import { NETWORK_ERROR } from "@/http/client";
import store from "@/store";
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch(USER_INIT_DATA_ACTION);
      next();
    } catch (e) {
      if (e == NETWORK_ERROR) {
        next();
      } else {
        next({ name: "Main" });
      }
    }
  },
};
</script>

<style>
</style>