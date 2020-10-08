<template>
  <div>
    <h4>{{$t('settings.title')}}</h4>
    <email-form class="mt-3"></email-form>
    <password-form class="mt-3"></password-form>
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