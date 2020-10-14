<template>
  <router-view></router-view>
</template>

<script>
import { USER_INIT_DATA_ACTION } from "@/store/naming";
import store from "@/store";
export default {
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch(USER_INIT_DATA_ACTION);
    } finally {
      next();
    }
  },
};
</script>

<style>
</style>