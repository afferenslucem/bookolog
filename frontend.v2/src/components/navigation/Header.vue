<template>
  <div class="header">
    <div class="left">
      <div
        class="icon"
        id="booksLists"
        v-if="isLoggedIn"
        @click="emitMenuClick($event)"
      >
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div @click="headerClick()" class="logo ml-1">
        <span>BKLG</span>
      </div>
    </div>
    <div>
      <div class="actions" v-if="isLoggedIn">
        <sync-button></sync-button>
        <div @click="emitAvatarClick($event)">
          <profile> </profile>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userMixin from "@/mixins/user-mixin";
import SyncButton from "@/components/connection-module/SyncButton.vue";
import Profile from "@/components/navigation/Profile.vue";
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
    headerClick() {
      if (this.isLoggedIn) {
        this.$router.push({ name: "InProgress" });
      } else {
        this.$router.push({ name: "Main" });
      }
    },
  },
  computed: {},
  components: {
    SyncButton,
    Profile,
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

.actions {
  display: flex;

  justify-content: center;

  align-items: center;

  > *:not(:last-child) {
    margin-right: 0.5rem;
  }
}
</style>