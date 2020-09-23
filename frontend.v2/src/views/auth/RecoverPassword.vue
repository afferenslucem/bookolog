<template>
  <form @submit="submit($event)" class="container mt-3" name="registration">
    <h4>{{ $t('auth.actions.recoverPassword.title') }}</h4>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('auth.registrationForm.email')"
        id="email-recover"
        v-model="email"
      />
    </div>
    <button class="btn btn-primary w-100" type="submit" :disabled="email === ''" >{{ $t('auth.registrationForm.submit') }}</button>
  </form>
</template>

<script>
import { UserClient } from "@/http/user-client";
import { NOTIFICATION_DANGER_ACTION, NOTIFICATION_INFO_ACTION } from "@/store/naming";

export default {
  data: () => ({
    email: ''
  }),
  methods: {
    submit(event) {
      this.recover(this.email).then(() => {
        this.$router.push({ name: "Login" });
        this.$store.dispatch(
          NOTIFICATION_INFO_ACTION,
          this.$t("auth.actions.recoverPassword.success")
        ); 
      });

      event.preventDefault();
      return false;
    },
    async recover(email) {
      try {
        await new UserClient().passwordRecover(email);

        this.$store.dispatch(
          NOTIFICATION_DANGER_ACTION,
          this.$t("auth.actions.recoverPassword.error")
        ); 
      } catch (e) {
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("auth.actions.recoverPassword.error")
          );   
          throw e;       
        }
      }
    },
};
</script>

<style>
</style>