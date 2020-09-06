<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { USER_RECOVER_ACTION } from '@/store/naming';
export default {
  async created() {
    await this.$store.dispatch(USER_RECOVER_ACTION)
  },
}
</script>

<style lang="scss">
  @import 'styles';
</style>
