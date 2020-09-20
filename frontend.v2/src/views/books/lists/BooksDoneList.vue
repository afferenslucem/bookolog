<template>
  <div class="container">
    <books-by-years-list :books="books" :listname="$t('book.lists.byStatus.done')">
    </books-by-years-list>
    <div v-if="!shouldShowList">{{ $t('book.lists.noOneBook') }}</div>
  </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
import BooksByYearsList from "@/components/books-lists/BooksByYearsList";

export default {
  components: {
    BooksByYearsList,
  },
  computed: {
    books() {
      return this.$store.getters[BOOKS_DONE_GETTER];
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    }
  }
};
</script>

<style scoped>
</style>