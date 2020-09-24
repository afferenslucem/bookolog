<template>
  <form @submit="submit($event)" class="container mt-3" name="password-change" autocomplete="off">
    <h5>{{ $t('settings.passwordChangeForm.title') }}</h5>
    <div class="form-group">
      <input
        class="form-control"
        :placeholder="$t('settings.passwordChangeForm.oldPassword')"
        id="old-password-change"
        v-model="passwordChangeData.oldPassword"
        autocomplete="off"
        type="password"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        :placeholder="$t('settings.passwordChangeForm.password')"
        class="form-control"
        id="password-change"
        v-model="passwordChangeData.password"
        autocomplete="off"
      />
    </div>
    <div class="form-group">
      <input
        type="password"
        :placeholder="$t('settings.passwordChangeForm.confirmPassword')"
        class="form-control"
        id="confirmation-change"
        v-model="passwordChangeData.confirmation"
        autocomplete="off"
      />
    </div>
    <div v-if="errors" class="text-center">
      <div
        v-if="errors.incorrectPassword"
        class="alert alert-danger"
      >{{$t('settings.passwordChangeForm.errors.incorrectPassword')}}</div>
      <div
        v-else-if="errors.passwordMatching"
        class="alert alert-danger"
      >{{$t('settings.passwordChangeForm.errors.passwordMatching')}}</div>
    </div>
    <button class="btn btn-primary w-100" type="submit">{{ $t('settings.passwordChangeForm.submit') }}</button>
  </form>
</template>

<script>
import { UserClient } from "@/http/user-client";
import {
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
} from "@/store/naming";
export default {
  data: () => ({
    passwordChangeData: {
      oldPassword: "",
      password: "",
      confirmation: "",
    },
    errors: {
      passwordMatching: false,
      incorrectPassword: false,
    },
  }),
  methods: {
    submit(event) {
      this.cleanErrors();
      if (this.validateForm()) {
        this.passwordChange(this.passwordChangeData).then(() => {
          this.$router.push({ name: "Home" });
          this.$store.dispatch(
            NOTIFICATION_SUCCESS_ACTION,
            this.$t("settings.passwordChangeForm.success")
          );
        });
      }
      event.preventDefault();
      return false;
    },
    cleanErrors() {
      this.errors.passwordMatching = false;
      this.errors.incorrectPassword = false;
    },
    validateForm() {
      if (this.passwordChangeData.confirmation == this.passwordChangeData.password) {
        this.errors.passwordMatching = false;
      } else {
        this.errors.passwordMatching = true;
        return false;
      }

      return true;
    },
    async passwordChange(passwordChangeData) {
      try {
        return await new UserClient().passwordChange(
          passwordChangeData.oldPassword,
          passwordChangeData.password
        );
      } catch (e) {
        console.log(e.response);
        if (e.response?.data === "Incorrect old password") {
          this.errors.incorrectPassword = true;
        } else {
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("settings.passwordChangeForm.errors.error")
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