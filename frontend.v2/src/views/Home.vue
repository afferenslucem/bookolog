<template>
  <div class="window">
    <side-menu class="left" :class="{opened: shouldShowLeftMenu}">
      Hello, I'm left
    </side-menu>
    <div class="overlay" v-if="shouldShowLeftMenu || shouldShowRightMenu" @click="closeAllMenus"></div>
    <div class="main">
      <Header class="top" @avatarclick="openRightMenu" @menuclick="openLeftMenu">
      </Header>
    </div>
    <side-menu class="right" :class="{opened: shouldShowRightMenu}">
      Hello, I'm rihgt
    </side-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/navigation/Header';
import SideMenu from '@/components/navigation/SideMenu';
import {getLogger} from '@/logger';

const logger = getLogger('HomePage');

export default {
  name: 'Home',
  components: {
    Header,
    SideMenu
  },
  data() {
    return {
      shouldShowLeftMenu: false,
      shouldShowRightMenu: false
    }
  },
  methods: {
    openLeftMenu() {
      this.shouldShowLeftMenu = true;
      logger.debug('Opened left menu');
    },
    openRightMenu() {
      this.shouldShowRightMenu = true;
      logger.debug('Opened right menu');
    },
    closeAllMenus() {
      this.shouldShowLeftMenu = false;
      this.shouldShowRightMenu = false;
      logger.debug('Closed all menus');
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '@/styles/variables';
  .window {
    height: 100%;
    width: 100%;

    position: relative;
  }
  
  .main {
    height: 100%;
    width: 100%;
  }

  .overlay {
    height: 100%;
    width: 100%;

    position: fixed;

    z-index: 500;

    background-color: $overlay-color;
  }

  .side-menu {
    width: 60%;

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