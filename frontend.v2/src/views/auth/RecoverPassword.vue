<template>
  <form @submit="submit($event)" name="registration">
    <h4>{{ $t('auth.recaveryPasswordForm.title') }}</h4>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('auth.recaveryPasswordForm.email')"
        id="email-recover"
        v-model.trim="email"
        type="email"
      />
    </div>
    <button class="btn btn-primary w-100" type="submit" :disabled="email === ''" >{{ $t('auth.recaveryPasswordForm.submit') }}</button>
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
          this.$t("auth.recaveryPasswordForm.success")
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
            this.$t("auth.recaveryPasswordForm.errors.error")
          );   
          throw e;       
        }
      }
    },
};
</script>

<style>
</style>