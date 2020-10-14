<template>
  <div class="circle">
    <div
      class="circle inner-circle connection-marker"
       :class="{ green: online, red: offline }"
    ></div>
  </div>
</template>

<script>
export default {
  computed: {
    online() {
      return this.$store.getters.online;
    },
    offline() {
      return this.$store.getters.offline;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

$circle-diameter: $icon-size / 4;

.circle {
  $size: $circle-diameter + 0.1rem;

  height: $size;
  width: $size;

  background-color: $header-color;
  border-radius: $size / 2;

  &.inner-circle {
    $size: $circle-diameter;

    height: $size;
    width: $size;

    border-radius: $size / 2;

    position: relative;

    left: 0.05rem;
    top: 0.05rem;
  }
}

.green {
  background-color: $connected-marker-color;
}

.red {
  background-color: $not-connected-marker-color;
}
</style>