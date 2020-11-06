<template>
  <div class="header">
    <div class="left">
      <div
        class="icon"
        id="menuButton"
        v-if="isLoggedIn"
        @click="emitMenuClick($event)"
      >
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>
    <div class="title pl-2">
      {{title | capital}}
    </div>
  </div>
</template>
<script>
import userMixin from "@/mixins/user-mixin";

export default {
  mixins: [userMixin],
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    emitMenuClick(event) {
      event.stopPropagation();
      this.$emit("menuClick");
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables";

.header {
  width: 100%;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 100;

  height: $header-height;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    flex: 0 0 auto;
  }

  background-color: $header-color;
  color: $header-text-color;

  .profile {
    justify-self: end;
  }
}

.logo {
  padding: 0.15rem;

  color: $white;

  font-weight: $fat-font-weight;
}

.left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header .title {
  flex: 1 0 auto;
  font-size: $big-font-size;
  font-weight: $fat-font-weight;
}

.actions {
  display: flex;

  justify-content: center;

  align-items: center;

  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
}
</style>
