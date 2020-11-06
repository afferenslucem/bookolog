<template>
  <div id="notification" v-if="shouldShow">
      <div class="notification-message alert text-center show hide" :class="notificationClass">
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
                    return {'alert-success': true};
                }
                case NOTIFICATION_DANGER_TYPE: {
                    return {'alert-danger': true};
                }
                case NOTIFICATION_WARN_TYPE: {
                    return {'alert-warning': true};
                }
                case NOTIFICATION_INFO_TYPE: {
                    return {'alert-info': true};
                }
            }

            return {}
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

    #notification {
        .notification-message {
            z-index: 15000;
            width: 80%;
            top: 1rem;
            position: fixed;
            margin: 0 auto;
            animation: 0.5s ease-in 0s forwards appear, 0.5s ease-out 2s forwards disappear;
        }
    }

    @keyframes appear {
        from {
            left: 100%;
        }

        to {
            left: 10%;
        }
    }

    @keyframes disappear {
        from {
            left: 10%;
        }

        to {
            left: -100%;
        }
    }
</style>
