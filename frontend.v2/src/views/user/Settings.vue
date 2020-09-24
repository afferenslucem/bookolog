<template>
  <div>
    <h4>{{$t('settings.title')}}</h4>
    <email-form></email-form>
    <password-form></password-form>
  </div>
</template>

<script>
import PasswordForm from '@/components/user-module/PasswordChangeForm.vue';
import EmailForm from '@/components/user-module/EmailChangeForm.vue';
export default {
  components: {
    PasswordForm,
    EmailForm
  }
};
</script>

<style>
</style>