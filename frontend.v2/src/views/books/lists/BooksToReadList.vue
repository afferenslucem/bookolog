<template>
  <div class="container mt-3 book-list">
    <ul v-if="shouldShowList">
      <li
        v-for="(book, key, index) of books"
        :class="{'mb-4' : index !== (books.length - 1)}"
        :key="book.guid"
      >
        <to-read-book :book="book"></to-read-book>
      </li>
    </ul>
    <div v-else>Ты ничего не собираешься читать</div>
  </div>
</template>

<script>
import { BOOKS_TO_READ_GETTER } from "@/store/naming";
import ToReadBook from "@/components/book/ToReadBook";

export default {
  components: {
    ToReadBook,
  },
  computed: {
    books() {
      return this.$store.getters[BOOKS_TO_READ_GETTER];
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
};
</script>

<style>
</style>