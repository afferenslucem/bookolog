<template>
  <router-view></router-view>
</template>

<script>
import { USER_INIT_DATA_ACTION } from "@/store/naming";
import store from "@/store";
import { UNAUTHORIZED_ERROR } from "@/http/client";
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch(USER_INIT_DATA_ACTION);
      next();
    } catch (e) {
      if (e == UNAUTHORIZED_ERROR) {
        next({ name: "Main" });
      } else {
        next();
      }
    }
  },
};
</script>

<style>
</style>