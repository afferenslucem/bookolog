<template>
  <div class="book-line" @click="lineClick()">
    <book-inline-header :book="book"></book-inline-header>
    <no-wrap-values v-if="showAuthors" :values="book.authors"></no-wrap-values>
    <div class="date-range dark-text" v-if="book.startDate || book.endDate">
      [ <small>{{book.startDate | dateFormat('...')}} - {{book.endDate | dateFormat('...')}}</small> ]
    </div>
    <div v-if="book.note">
      <small class="dark-text">{{book.note}}</small>
    </div>
  </div>
</template>

<script>
import BookInlineHeader from "@/components/book-module/book/BookInlineHeader.vue";
import bookMixin from "@/mixins/book-entity-mixin";

export default {
  mixins: [bookMixin],
  computed: {
    showAuthors() {
      return this.book.authors && this.book.authors.length > 0;
    }
  },
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
  components: {
    BookInlineHeader
  }
};
</script>

<style>
</style>