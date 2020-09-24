<template>
  <div>
    <h4>{{$t('settings.title')}}</h4>
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