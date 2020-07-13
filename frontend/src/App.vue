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
import { UserActions } from '@/store/modules/user/storage-methods';

  import axios from 'axios';

  export default userMixin.extend({
    components: { AppHeader, AppLoggedInHeader },
    data() {
      return {
        books: []
      }
    },
    methods: {
    },
    mixins: [userMixin],
    async beforeCreate(): Promise<void> {
      const loggedIn = await this.$store.dispatch(UserActions.isLoggedIn);

      if (!loggedIn) {
        this.$router.push({name: 'Main'})
      } else {
        //this.$router.push({name: 'Reading'})
      }
    }
  })
</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
