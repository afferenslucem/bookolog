<template>
  <div class="container book-list">
    <h4 class="mt-1 header">Буду читать</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="book of books"
        class="mb-4"
        :key="book.guid"
      >
        <to-read-book :book="book"></to-read-book>
      </li>
    </ul>
    <div v-else>Здесь пока ничего нет.</div>
  </div>
</template>

<script>
import { BOOKS_TO_READ_GETTER } from "@/store/naming";
import ToReadBook from "@/components/book/ToReadBook";
import u from "declarray";

export default {
  components: {
    ToReadBook,
  },
  computed: {
    books() {
      return u(this.$store.getters[BOOKS_TO_READ_GETTER]).orderByDescending(item => item.modifyTime || '0').thenByDescending(item => item.name).toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
};
</script>

<style>
</style>