<template>
  <div class="container mt-3 book-list">
    <ul v-if="shouldShowList">
      <li
        v-for="(book, key, index) of books"
        :class="{'mb-4' : index !== (books.length - 1)}"
        :key="book.guid"
      >
        <done-book :book="book"></done-book>
      </li>
    </ul>
    <div v-else>Ты ничего прочитал</div>
  </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
import DoneBook from "@/components/book/DoneBook";

export default {
  components: {
    DoneBook,
  },
  computed: {
    books() {
      return this.$store.getters[BOOKS_DONE_GETTER];
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
};
</script>

<style>
</style>