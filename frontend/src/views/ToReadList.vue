<template>
  <div class="list book">
    <div class="header">
      <h2>Список к прочтению</h2>
    </div>
    <div class="body">
      <div class="list-line" v-for="(item, index) in toRead" :key="item.id">
        <span class="index">        
          {{index + 1}}.
        </span>
        <app-book :book="item"></app-book>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import AppBook from '@/components/entities/Book.vue';

    import booksMixin from '@/mixins/books';

    export default Vue.extend({
        components: { AppBook },
        mixins: [booksMixin]
    })
</script>

<style lang="scss" scoped>
  .list-line {
    display: flex;
    justify-content: flex-start;
    align-items: start;

    .index {
      padding-right: 1rem;
    }
  }
</style>