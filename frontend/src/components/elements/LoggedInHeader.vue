<template>
  <div class="menu">
      <main-icon @click="goToMain" class="main-icon"></main-icon>
      <router-link to="/to-read">К Прочтению</router-link>
      <div class="auth-button btn btn-primary" @click="logout">Log out</div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import MainIcon from '@/components/elements/MainIcon.vue';
    import { UserModule } from '@/types/user-module';
    import userMixin from '@/mixins/user';
    import headerMixin from '@/mixins/header';

    export default Vue.extend({
        components: {MainIcon},
        mixins: [userMixin, headerMixin]
    })
</script>

<style lang="scss" scoped>

</style>