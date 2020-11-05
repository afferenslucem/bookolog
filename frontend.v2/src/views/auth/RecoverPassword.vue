<template>
  <form @submit="submit($event)" name="registration">
    <div class="form-group">
      <label for="email-recover">{{ $t('auth.recoveryPasswordForm.email') }}</label>
      <input
        class="form-control"
        id="email-recover"
        v-model.trim="email"
        type="email"
      />
    </div>
    <button class="btn btn-primary w-100" type="submit" :disabled="email === ''" >{{ $t('auth.recoveryPasswordForm.submit') }}</button>
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
          this.$t("auth.recoveryPasswordForm.success")
        ); 
      });

      event.preventDefault();
      return false;
    },
    async recover(email) {
      try {
        await new UserClient().passwordRecover(email);
      } catch (e) {
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("auth.recoveryPasswordForm.errors.error")
          );   
          throw e;       
        }
      }
    },
};
</script>

<style>
</style>
