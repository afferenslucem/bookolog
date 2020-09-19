<template>
  <ul class="nav flex-column">
    <li class="nav-item" v-if="!isLoggedIn" @click="onLogin()">
      <a class="nav-link" href="#" id="loginButton">Вход</a>
    </li>
    <li class="nav-item" v-else @click="onLogout()">
      <a class="nav-link" href="#" id="logoutButton">Выход</a>
    </li>
  </ul>
</template>
<script>
import userMixin from '@/mixins/user-mixin';
import sideMenuMixin from '@/mixins/side-menu-mixin';

export default {
  mixins: [userMixin, sideMenuMixin],
  methods: {
    async onLogin() {
      await this.login();
      this.emitClick();
    },
    async onLogout() {
      await this.logout();
      this.emitClick();
    }
  }
}
</script>