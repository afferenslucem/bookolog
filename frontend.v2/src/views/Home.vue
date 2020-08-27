<template>
  <div class="window">
    <side-menu class="left" :class="{opened: shouldShowLeftMenu}">
      <book-menu @itemClick="closeAllMenus()"></book-menu>
    </side-menu>
    <div class="overlay" :class="{active: showOverlay}" @click="closeAllMenus()"></div>
    <div class="main">
      <Header class="top" @avatarClick="openRightMenu()" @menuClick="openLeftMenu()"></Header>
      <div class="content">
        <router-view />
      </div>
    </div>
    <side-menu class="right" :class="{opened: shouldShowRightMenu}">
      <user-menu @itemClick="closeAllMenus()"></user-menu>
    </side-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/navigation/Header";
import SideMenu from "@/components/navigation/SideMenu";
import BookMenu from "@/components/navigation/BookMenu";
import UserMenu from "@/components/navigation/UserMenu";
import { BOOKS_LOAD_ACTION } from "@/store/naming";
import { getLogger } from "@/logger";

const logger = getLogger("HomePage");

export default {
  name: "Home",
  components: {
    Header,
    SideMenu,
    BookMenu,
    UserMenu,
  },
  data() {
    return {
      shouldShowLeftMenu: false,
      shouldShowRightMenu: false,
    };
  },
  methods: {
    openLeftMenu() {
      this.shouldShowLeftMenu = true;
      logger.debug("Opened left menu");
    },
    openRightMenu() {
      this.shouldShowRightMenu = true;
      logger.debug("Opened right menu");
    },
    closeAllMenus() {
      this.shouldShowLeftMenu = false;
      this.shouldShowRightMenu = false;
      logger.debug("Closed all menus");
    },
  },
  computed: {
    showOverlay() {
      return this.shouldShowLeftMenu || this.shouldShowRightMenu;
    },
  },
  created() {
    logger.debug("created");
    this.$store.dispatch(BOOKS_LOAD_ACTION);
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.window {
  height: 100vh;
  width: 100%;

  position: relative;
}

.main {
  height: 100vh;
  width: 100%;

  .content {
    height: calc(100vh - #{$header-height});
    width: 100%;

    overflow: auto;
    position: absolute;
    top: $header-height;
    left: 0;
  }
}

.overlay {
  height: 100%;
  width: 100%;

  visibility: hidden;

  opacity: 0;

  transition: opacity 0.5s ease-in-out;

  position: fixed;

  z-index: 500;

  background-color: $overlay-color;

  &.active {
    visibility: visible;
    opacity: 1;
  }
}

.side-menu {
  width: 75%;

  position: fixed;
  top: 0;
  z-index: 1000;

  $menu-open-time: 0.5s;
  $menu-open-animation: ease-in-out;

  &.left {
    left: -100%;

    transition: left $menu-open-time $menu-open-animation;

    &.opened {
      left: 0;
    }
  }
  &.right {
    right: -100%;

    transition: right $menu-open-time $menu-open-animation;

    &.opened {
      right: 0;
    }
  }
}
</style>