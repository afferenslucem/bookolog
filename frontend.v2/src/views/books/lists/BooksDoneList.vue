<template>
  <div class="container pt-1">
    <books-by-years-list v-if="shouldShowList" :books="books" listname="Прочитал">
      
    </books-by-years-list>
    <div v-else>Здесь пока ничего нет.</div>
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