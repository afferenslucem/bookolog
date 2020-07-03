<template>
  <div class="container">
      <h2>{{listName}}</h2>

      <hr class="mt-3" />

      <div class="mt-3">
        <app-book v-for="book in items" :key="book.id" :book="book"></app-book>
      </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Book } from '@/types/books-module';
    import AppBook from '@/components/entities/Book.vue';

    export default Vue.extend({
        components: { AppBook },
        props: {
            items: {
                type: Array,
                required: true
            },
            listName: {
                type: String,
                required: true
            }
        }
    })
</script>

<style lang="scss" scoped>

</style>