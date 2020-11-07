<template>
  <div class="sync-button flex-centered" @click="runSync()">
    <sync-icon></sync-icon>
  </div>
</template>

<script>
import {
  USER_SYNC_DATA_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_WARNING_ACTION,
} from "@/store/naming";
import SyncIcon from "@/components/icon/SyncIcon.vue";
import { NETWORK_ERROR } from "@/http/client";
export default {
  components: {
    SyncIcon,
  },
  methods: {
    runSync() {
      this.$store
        .dispatch(USER_SYNC_DATA_ACTION)
        .then(() =>
          this.$store.dispatch(
            NOTIFICATION_SUCCESS_ACTION,
            this.$t("sync.success")
          )
        )
        .catch((e) => {
          if (e == NETWORK_ERROR) {
            this.$store.dispatch(
              NOTIFICATION_WARNING_ACTION,
              this.$t("sync.offline")
            );
          } else {
            this.$store.dispatch(
              NOTIFICATION_DANGER_ACTION,
              this.$t("sync.error")
            );
          }
        });
    },
  },
  computed: {
    offline() {
      return this.$store.getters.offline;
    },
  },
};
</script>

<style lang="scss" scoped>
    .sync-button {
        height: 1.2rem;
        width: 1.2rem;
    }
</style>
