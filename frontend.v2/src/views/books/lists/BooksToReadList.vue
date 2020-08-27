<template>
  <div class="container pt-1 book-list">
    <h4 class="mt-1 header">Буду читать</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="(book, key, index) of books"
        :class="{'mb-4' : index !== (books.length - 1)}"
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
import u from "ursus-utilus-collections";

export default {
  components: {
    ToReadBook,
  },
  computed: {
    books() {
      return u(this.$store.getters[BOOKS_TO_READ_GETTER]).sortBy(item => item.modifyTime || '0').thenBy(item => item.name).reverse().toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
};
</script>

<style>
</style>