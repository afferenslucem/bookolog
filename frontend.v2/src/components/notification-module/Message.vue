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
        position: fixed;

        z-index: 5000;

        top: 1rem;
        left: 0;

        width: 100%;
        height: 4rem;

        .notification-message {
            width: 80%;
            position: relative;
            margin: 0 auto;
            animation: 0.5s ease-in 0s forwards appear, 0.5s ease-out 2s forwards disappear;
        }
    }

    @keyframes appear {
        from {
            left: 100%;
        }

        to {
            left: 0;
        }
    }

    @keyframes disappear {
        from {
            left: 0%;
        }

        to {
            left: -100%;
        }
    }
</style>