<template>
  <form
    @submit="submit($event)"
    name="email-change"
    autocomplete="off"
  >
    <h5>{{ $t("settings.emailChangeForm.title") }}</h5>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('settings.emailChangeForm.email')"
        id="email-change"
        v-model.trim="email"
        autocomplete="off"
        type="email"
      />
    </div>
    <button
      class="btn btn-primary w-100"
      type="submit"
      :disabled="email === ''"
    >
      {{ $t("settings.emailChangeForm.submit") }}
    </button>
  </form>
</template>

<script>
import { UserClient } from "@/http/user-client";
import {
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
  USER_SET_EMAIL_MUTATION,
} from "@/store/naming";
export default {
  data: () => ({
    email: "",
  }),
  created() {
    this.email = this.$store.state.user.email;
  },
  methods: {
    submit(event) {
      this.emailChange(this.email).then(() => {
        this.$store.dispatch(
          NOTIFICATION_SUCCESS_ACTION,
          this.$t("settings.emailChangeForm.success")
        );
        this.$store.commit(USER_SET_EMAIL_MUTATION, this.email);
      });
      event.preventDefault();
      return false;
    },
    async emailChange(email) {
      try {
        return await new UserClient().emailChange(email);
      } catch (e) {
        this.$store.dispatch(
          NOTIFICATION_DANGER_ACTION,
          this.$t("settings.emailChangeForm.errors.error")
        );
        throw e;
      }
    },
  },
};
</script>

<style>
</style>