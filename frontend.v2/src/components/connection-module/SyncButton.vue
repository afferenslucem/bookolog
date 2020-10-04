<template>
  <div @click="runSync()">
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
import SyncIcon from '@/components/icons/SyncIcon.vue';
export default {
  components: {
    SyncIcon,
  },
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