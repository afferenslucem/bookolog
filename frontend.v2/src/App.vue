<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {
  CONNECTION_ONLINE_ACTION,
  CONNECTION_OFFLINE_ACTION,
  USER_RECOVER_ACTION,
  USER_LOGOUT_ACTION,
} from '@/store/naming';

import {
  Client
} from '@/http/client';

export default {
  async created() {
    Client.prototype.onSuccess = () => this.$store.dispatch(CONNECTION_ONLINE_ACTION);
    Client.prototype.onNetworkError = () => this.$store.dispatch(CONNECTION_OFFLINE_ACTION);
    Client.prototype.onForbiddenError = () => this.$store.dispatch(USER_LOGOUT_ACTION);

    await this.$store.dispatch(USER_RECOVER_ACTION)
  },
}
</script>

<style lang="scss">
  @import 'styles';
</style>
