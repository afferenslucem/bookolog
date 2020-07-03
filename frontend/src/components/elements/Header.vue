<template>
  <div class="menu">
      <main-icon class="main-icon"></main-icon>
      <div class="auth-button btn btn-primary" @click="login">Log in</div>
  </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import MainIcon from '@/components/elements/MainIcon.vue';
    import { UserModule } from '@/types/user-module';
    import userMixin from '@/mixins/user';

    export default Vue.extend({
        name: 'AppHeader',
        components: { MainIcon },
        data() {
            return {

            }
        },
        mixins: [userMixin]
    })
</script>

<style lang="scss" scoped>
</style>