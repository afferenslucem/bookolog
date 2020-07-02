<template>
  <div id="app">
    <header>
      <app-header></app-header>
    </header>
    <main>{{books}}</main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppHeader from '@/components/elements/Header.vue';  
  import axios from 'axios';

  export default Vue.extend({
    components: { AppHeader },
    data() {
      return {
        books: []
      }
    },
    methods: {
      load(): any {
        
      }
    },
    async beforeCreate() {
      try {
        const data = await axios.get('/books.json');
        this.books = data.data.books;
        return;
      }
      catch(e) {
        console.log(e);
      }
    }
  })
</script>

<style lang="scss">
  @import './styles/styles.scss';
</style>
