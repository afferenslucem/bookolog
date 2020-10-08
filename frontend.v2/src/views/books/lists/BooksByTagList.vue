<template>
  <div class="book-year-list">    
    <books-by-years-list v-if="shouldShowList" :books="books" :listname="name | capital">
      
    </books-by-years-list>
    <div v-else>{{ $t('book.lists.noOneBook') }}</div>
  </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
import BooksByYearsList from "@/components/book-module/books-lists/BooksByYearsList";
import _ from "declarray";

export default {
  components: {
    BooksByYearsList,
  },
  data: () => ({
    name: "",
  }),
  computed: {
    books() {
      return _(this.$store.getters[BOOKS_DONE_GETTER])
        .where((item) => !!item.tags && !!item.tags.length)
        .where((item) => _(item.tags)
        .any(item => item.toLowerCase() == this.name.toLowerCase()))
        .orderByDescending((item) => +item.modifyDate)
        .thenByDescending((item) => item.name)
        .toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
  created() {
    this.name = this.$route.params.name;
  },
};
</script>

<style>
</style>