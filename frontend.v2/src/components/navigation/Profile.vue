<template>
  <div class="icon profile">
    <person-icon></person-icon>
    <connection-marker class="marker"></connection-marker>
    <total-read-count class="total-count"></total-read-count>
  </div>
</template>

<script>
import PersonIcon from "@/components/icons/PersonIcon.vue";
import ConnectionMarker from "@/components/connection-module/ConnectionMarker.vue";
import TotalReadCount from "@/components/statistic-module/TotalReadBooksCount.vue";
export default {
  components: {
    ConnectionMarker,
    TotalReadCount,
    PersonIcon,
  },
};
</script>

<style lang="scss" scoped>
.profile {
  position: relative;

  > .marker {
    position: absolute;

    right: 0.1rem;
    top: 0;
  }

  > .total-count {
    left: 0;
    bottom: 0;

    font-size: 0.65rem;

    transform: translate(5%, 0%);

    position: absolute;
  }
}
</style>