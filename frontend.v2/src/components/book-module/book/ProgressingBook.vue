<template>
  <div class="book-line" @click="lineClick()">
    <book-inline-header :book="book"></book-inline-header>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
    <progress-bar v-if="shouldShowProgress" :progress="progress" ></progress-bar>
  </div>
</template>

<script>
import BookInlineHeader from "@/components/book-module/book/BookInlineHeader.vue";
import bookMixin from '@/mixins/book-entity-mixin';
import ProgressBar from '@/components/book-module/book/ProgressBar.vue'; 

export default {
  components: {
    ProgressBar,
    BookInlineHeader,
  },
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