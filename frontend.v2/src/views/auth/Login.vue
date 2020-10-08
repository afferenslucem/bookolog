<template>
  <div>
    <form @submit="login($event)">
      <h4>{{ $t('auth.loginForm.title') }}</h4>
      <div class="form-group">
        <input
          class="form-control"
          :placeholder="$t('auth.loginForm.username')"
          id="login"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          class="form-control"
          id="password"
          :placeholder="$t('auth.loginForm.password')"
          v-model="password"
        />
      </div>

      <div class="form-group" v-if="errors.incorrectCredentials">
        <div class="alert alert-danger text-center">{{ $t('auth.loginForm.incorrectCredentials') }}</div>
      </div>

      <div class="mt-2 mb-2">
        <router-link :to="{name: 'RecoverPassword'}">Восстановить пароль</router-link>
      </div>

      <button class="btn btn-primary w-100" type="submit">{{ $t('auth.loginForm.submit') }}</button>
    </form>
  </div>
</template>

<script>
import { USER_LOGIN_ACTION } from "@/store/naming";
import { INCORRECT_CREDENTIALS_EXCEPTION } from "@/http/user-client";

export default {
  data: () => ({
    username: "",
    password: "",
    errors: {},
  }),
  methods: {
    async login(event) {
      event.preventDefault();
      try {
        await this.$store.dispatch(USER_LOGIN_ACTION, {
          username: this.username,
          password: this.password,
        });

        this.errors = {};

        this.$router.push({ name: "InProgress" });

        return false;
      } catch (e) {
        if (e == INCORRECT_CREDENTIALS_EXCEPTION) {
          this.$forceUpdate();
          this.errors.incorrectCredentials = true;
        }
      }
    },
  },
};
</script>

<style>
</style>