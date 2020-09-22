<template>
  <div id="notification">
      <div class="notification-message" :class="notificationClass" v-show="shouldShow">
          {{text}}
      </div>
  </div>
</template>

<script>
import {
    NOTIFICATION_SUCCESS_TYPE,
    NOTIFICATION_DANGER_TYPE,
    NOTIFICATION_WARN_TYPE,
    NOTIFICATION_INFO_TYPE,
} from '@/models/notification.js';
export default {
    computed: {
        text() {
            return this.$store.getters.notificationText;
        },
        shouldShow() {
            return this.$store.getters.notificationShow;
        },
        notificationClass() {
            const type = this.$store.getters.notificationType;

            switch(type) {
                case NOTIFICATION_SUCCESS_TYPE: {
                    return {success: true};
                }
                case NOTIFICATION_DANGER_TYPE: {
                    return {danger: true};
                }
                case NOTIFICATION_WARN_TYPE: {
                    return {warn: true};
                }
                case NOTIFICATION_INFO_TYPE: {
                    return {info: true};
                }
            }

            return {}
        }
    }
}
</script>

<style lang="scss" scoped>
    #notification {
        position: absolute;

        top: 0;
        left: 0;

        width: 100%;

        .notification-message {
            width: 80%;

            margin: 1rem auto 0 auto;
        }
    }
</style>