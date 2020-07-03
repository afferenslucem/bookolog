<template>
  <div id="app">
    <header>
      <div class="container">
        <app-header v-if="!loggedIn"></app-header>
        <app-logged-in-header v-else></app-logged-in-header>
      </div>
    </header>
    <main class="container mt-2">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppHeader from '@/components/elements/Header.vue'; 
  import AppLoggedInHeader from '@/components/elements/LoggedInHeader.vue'; 
  import { UserModule } from '@/types/user-module';
  import userMixin from '@/mixins/user';

  import axios from 'axios';

  export default Vue.extend({
    components: { AppHeader, AppLoggedInHeader },
    data() {
      return {
        books: []
      }
    },
    methods: {
    },
    mixins: [userMixin]
  })
</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
