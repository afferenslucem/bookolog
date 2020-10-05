<template>
  <router-view></router-view>
</template>

<script>
import { USER_SYNC_DATA_ACTION } from '@/store/naming';
import store from '@/store';
export default {
  beforeRouteEnter (to, from, next) {
    store.dispatch(USER_SYNC_DATA_ACTION).finally(() => next())
  },
};
</script>

<style>
</style>