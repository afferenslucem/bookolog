<template>
  <ul class="nav flex-column">
    <li class="nav-item" v-if="!isLoggedIn" @click="onLogin()">
      <a class="nav-link" href="#" id="loginButton">{{ $t('auth.actions.login.title') }}</a>
    </li>
    <li class="nav-item" v-else @click="onLogout()">
      <a class="nav-link" href="#" id="logoutButton">{{ $t('auth.actions.logout.title') }}</a>
    </li>
    <li class="nav-item" v-if="!isLoggedIn" @click="onRegistration()">
      <a class="nav-link" href="#" id="registrationButton">{{ $t('auth.actions.registration.title') }}</a>
    </li>
    <li class="nav-item" v-if="isLoggedIn" @click="onLogin()">
      <a class="nav-link" href="#" id="passwordChangeButton">{{ $t('auth.actions.passwordChange.title') }}</a>
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
    async onRegistration() {
      await this.registration();
      this.emitClick();
    },
    async onLogout() {
      await this.logout();
      this.emitClick();
    },
    async onPasswordChange() {
      await this.passwordChange();
      this.emitClick();
    }
  }
}
</script>