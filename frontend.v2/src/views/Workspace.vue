<template>
  <router-view></router-view>
</template>

<script>
import { BOOKS_SYNC_ACTION } from '@/store/naming';
import store from '@/store';
export default {
  beforeRouteEnter (to, from, next) {
    store.dispatch(BOOKS_SYNC_ACTION).finally(() => next())
  },
};
</script>

<style>
</style>