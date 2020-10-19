<template>
  <router-view></router-view>
</template>

<script>
import { USER_INIT_DATA_ACTION } from "@/store/naming";
import store from "@/store";
import { UNAUTHORIZED_ERROR } from "@/http/client";
import {
    getLogger
} from '@/logger';

const logger = getLogger('App');

export default {
  async beforeRouteEnter(to, from, next) {
    try {
      await store.dispatch(USER_INIT_DATA_ACTION);
      next();
    } catch (e) {
      logger.error('App init error', e)

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