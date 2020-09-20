<template>
  <div class="circle connection-marker" :class="{green: online, red: offline}"></div>
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
.circle {
    $size: $icon-size / 4;

    height: $size;
    width: $size;

    border-radius: $size / 2;
}

.green {
    background-color: $connected-marker-color;
}

.red {
    background-color: $not-connected-marker-color;
}
</style>