<template>
  <form @submit="submit($event)" name="avatar-change" autocomplete="off">
    <h5>{{ $t("settings.avatarChangeForm.title") }}</h5>
    <div class="form-group">
      <input
        type="file"
        class="form-control-file"
        :data-buttonText="$t('settings.avatarChangeForm.noFileChosen')"
        @change="onFileChange($event)"
      />
    </div>
    <button
      class="btn btn-primary w-100"
      type="submit"
      :disabled="file === null"
    >
      {{ $t("settings.avatarChangeForm.submit") }}
    </button>
  </form>
</template>

<script>
import { UserClient } from "@/http/user-client";
import {
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_SUCCESS_ACTION,
  USER_SET_AVATAR_MUTATION,
} from "@/store/naming";
export default {
  data: () => ({
    file: null,
  }),
  methods: {
    async submit(event) {
      try {
        event.preventDefault();

        const data = new FormData();

        data.append("file", this.file);

        var avatar = await new UserClient().uploadAvatar(data);

        this.$store.commit(USER_SET_AVATAR_MUTATION, avatar);

        this.$store.dispatch(
          NOTIFICATION_SUCCESS_ACTION,
          this.$t("settings.avatarChangeForm.success")
        );

        return false;
      } catch (e) {
        this.$store.dispatch(
          NOTIFICATION_DANGER_ACTION,
          this.$t("settings.avatarChangeForm.errors.error")
        );
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
    },
  },
};
</script>

<style>
</style>