<template>
  <form @submit="submit($event)" class="container mt-3" name="registration">
    <h4>{{ $t('auth.registrationForm.title') }}</h4>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('auth.registrationForm.username')"
        id="login-registration"
        v-model="user.username"
      />
    </div>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('auth.registrationForm.email')"
        id="email-registration"
        v-model="user.email"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        :placeholder="$t('auth.registrationForm.password')"
        class="form-control"
        id="password-registration"
        v-model="user.password"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        :placeholder="$t('auth.registrationForm.confirmPassword')"
        class="form-control"
        id="confirmation-confirmation-registration"
        v-model="user.confirmation"
      />
    </div>
    <div v-if="errors" class="text-center">
      <div v-if="errors.emailAlreadyExisists" class="alert alert-danger">
        {{$t('auth.registrationForm.errors.emailAlreadyExisists')}}
      </div>
      <div v-else-if="errors.loginAlreadyExisists" class="alert alert-danger">
        {{$t('auth.registrationForm.errors.loginAlreadyExisists')}}
      </div>
      <div v-else-if="errors.passwordMatching" class="alert alert-danger">
        {{$t('auth.registrationForm.errors.passwordMatching')}}
      </div>
    </div>
    <button class="btn btn-primary w-100" type="submit">{{ $t('auth.registrationForm.submit') }}</button>
  </form>
</template>

<script>
import { UserClient } from "@/http/user-client";
import { NOTIFICATION_DANGER_ACTION, NOTIFICATION_SUCCESS_ACTION } from "@/store/naming";

export default {
  data: () => ({
    user: {
      username: "",
      email: "",
      password: "",
      confirmation: "",
    },
    errors: {
      passwordMatching: false,
      emailAlreadyExisists: false,
      loginAlreadyExisists: false,
    },
  }),
  methods: {
    submit(event) {
      this.cleanErrors();
      if (this.validateForm()) {
        this.register(this.user).then(() => {
          this.$router.push({ name: "Login" });
          this.$store.dispatch(
            NOTIFICATION_SUCCESS_ACTION,
            this.$t("auth.registrationForm.success")
          ); 
        });
      }
      event.preventDefault();
      return false;
    },
    cleanErrors() {
      this.errors.emailAlreadyExisists = false;
      this.errors.loginAlreadyExisists = false;
      this.errors.passwordMatching = false;
    },
    validateForm() {
      if (this.user.confirmation == this.user.password) {
        delete this.errors.passwordMatching;
      } else {
        this.errors.passwordMatching = true;
        return false;
      }

      return true;
    },
    async register(user) {
      try {
        return await new UserClient().register(
          user.username,
          user.email,
          user.password
        );
      } catch (e) {
        console.log(e.response);
        if(e.response?.data === 'User with same login already exisists') {
          this.errors.loginAlreadyExisists = true;
        } else if (e.response?.data === 'User with same email already exisists') {
          this.errors.emailAlreadyExisists = true;
        } else {
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("auth.registrationForm.errors.registrationError")
          );          
        }
        throw e;
      }
    },
  },
};
</script>

<style>
</style>