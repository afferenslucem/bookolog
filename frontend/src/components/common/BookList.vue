<template>
  <div class="container">
      <h2>{{listName}}</h2>

      <hr class="mt-3" />

      <div class="mt-3">

      </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Book } from '@/types/books-module';

    export default Vue.extend({
        props: {
            items: {
                type: Object,
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