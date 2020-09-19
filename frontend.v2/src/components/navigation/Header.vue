<template>
  <div class="header">
    <div class="left">
      <div class="icon" id="booksLists" v-if="isLoggedIn" @click="emitMenuClick($event)">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <router-link :to="{name: 'Home'}" class="logo ml-1">
          <img src="/img/logo.png" />
      </router-link>
    </div>
    <div>
      <div class="icon profile" v-if="!isLoggedIn" @click="emitAvatarClick($event)">
        <i class="fa fa-user-o" aria-hidden="true"></i>
      </div>
      <div class="icon avatar profile" v-else @click="emitAvatarClick($event)">
        <img src="/avatar.jpg" />
      </div>
    </div>
  </div>
</template>
<script>
import userMixin from "@/mixins/user-mixin";
export default {
  mixins: [userMixin],
  methods: {
    emitAvatarClick(event) {
      event.stopPropagation();
      this.$emit("avatarClick");
    },
    emitMenuClick(event) {
      event.stopPropagation();
      this.$emit("menuClick");
    },
  },
  computed: {},
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

      border: $split-line;

      border-radius: 0.1rem;

      > img {
          height: calc(#{$icon-size} - 0.75rem);
      }
  }

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>