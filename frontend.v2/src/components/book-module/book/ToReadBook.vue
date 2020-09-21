<template>
  <div class="book-line">
    <book-inline-header :book="book"></book-inline-header>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
  </div>
</template>

<script>
import BookInlineHeader from "@/components/book-module/book/BookInlineHeader.vue";
import bookMixin from '@/mixins/book-entity-mixin';

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
  },
  components: {
    BookInlineHeader,
  }
};
</script>

<style>
</style>