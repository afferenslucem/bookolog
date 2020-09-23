<template>
  <div>
    <h3>{{$t('settings.title')}}</h3>
    <password-form></password-form>
  </div>
</template>

<script>
import PasswordForm from '@/components/user-module/PasswordChangeForm.vue';
export default {
  components: {
    PasswordForm
  }
};
</script>

<style>
</style>