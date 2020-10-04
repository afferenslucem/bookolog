<template>
  <div @click="runSync()">
    <i class="fa fa-sync-alt" aria-hidden="true"></i>
  </div>
</template>

<script>
import {
  USER_SYNC_DATA_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_WARNING_ACTION,
} from "@/store/naming";
export default {
  methods: {
    runSync() {
      if (this.offline) {
        this.$store.dispatch(NOTIFICATION_WARNING_ACTION, this.$t("sync.offline"));
        return;
      } else {
        this.$store
          .dispatch(USER_SYNC_DATA_ACTION)
          .then(() =>
            this.$store.dispatch(
              NOTIFICATION_SUCCESS_ACTION,
              this.$t("sync.success")
            )
          )
          .catch(() =>
            this.$store.dispatch(NOTIFICATION_DANGER_ACTION, this.$t("sync.error"))
          );
      }
    },
  },
  computed: {
    offline() {
      return this.$store.getters.offline;
    },
  },
};
</script>

<style>
</style>