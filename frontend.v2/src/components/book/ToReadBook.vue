<template>
  <div>
    <div>
      <strong>{{book.name}}</strong>
    </div>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
    <div v-if="book.year">
      <span>Год издания: {{book.year}}</span>
    </div>
    <div v-if="book.genre">
      <span>Жанр: {{book.genre | capital}}</span>
    </div>
    <div v-if="book.note">
      <small class="dark-text">{{book.note}}</small>
    </div>
  </div>
</template>

<script>
import bookMixin from '@/mixins/book-mixin';

export default {
  mixins:[bookMixin],
  computed: {
    showAuthors() {
      return this.book.authors && (this.book.authors.length > 0)
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  }
};
</script>

<style>
</style>