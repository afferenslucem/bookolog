<template>
  <form @submit="submit($event)" class="container mt-3">
    <div class="form-group">
        <input
          class="form-control"
          :placeholder="$t('auth.registrationForm.username')"
          id="login"
          v-model="user.username"
        />
      </div>
    <div class="form-group">
        <input
          class="form-control"
          :placeholder="$t('auth.registrationForm.email')"
          id="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          :placeholder="$t('auth.registrationForm.password')"
          class="form-control"
          id="password"
          v-model="user.password"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          :placeholder="$t('auth.registrationForm.confirmPassword')"
          class="form-control"
          id="confirmation"
          v-model="user.confirmation"
        />
      </div>
      <button class="btn btn-primary w-100" type="submit">{{ $t('auth.registrationForm.submit') }}</button>
  </form>
</template>

<script>
import { UserClient } from '@/http/user-client';
import {
  NOTIFICATION_DANGER_ACTION,
} from "@/store/naming";

export default {
    data: () => ({
        user: {
            username: '',
            email: '',
            password: '',
            confirmation: '',
        },
        errors: {
            passwordMatching: false,
        }
    }),
    methods: {
        submit(event) {
            if(this.validateForm()) {
                this.register(this.user).then(() => {
                    this.$router.push({name: 'Login'});
                })
            }
            event.preventDefault();
            return false;
        },
        validateForm() {
            if(this.user.confirmation == this.user.password) {
                delete this.errors.passwordMatching;
            } else {
                this.errors.passwordMatching = true;
                return false;
            }

            return true;
        },
        async register(user) {
            try {
                return await new UserClient().register(user.username, user.email, user.password);
            } catch (e) {
                this.$store.dispatch(NOTIFICATION_DANGER_ACTION, this.$t('auth.registrationForm.registrationError'));
                console.log(e.response)
            }
        }
    }
}
</script>

<style>

</style>