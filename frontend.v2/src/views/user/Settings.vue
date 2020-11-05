<template>
  <div>
    <avatar-form class="mt-3"></avatar-form>
    <email-form class="mt-3"></email-form>
    <password-form class="mt-3"></password-form>
  </div>
</template>

<script>
import PasswordForm from '@/components/user/PasswordChangeForm.vue';
import EmailForm from '@/components/user/EmailChangeForm.vue';
import AvatarForm from '@/components/user/AvatarChangeForm.vue';
export default {
  components: {
    PasswordForm,
    AvatarForm,
    EmailForm,
  }
};
</script>

<style>
</style>
