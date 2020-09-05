<template>
  <div class="container book-list">
    <h4 class="mt-1 header">Читаю сейчас</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="book of books"
        class="mb-4"
        :key="book.guid"
      >
        <progressing-book :book="book"></progressing-book>
      </li>
    </ul>
    <div v-else>Здесь пока ничего нет.</div>
  </div>
</template>

<script>
import { BOOKS_IN_PROGRESS_GETTER } from "@/store/naming";
import ProgressingBook from "@/components/book/ProgressingBook";
import u from "declarray";

export default {
  components: {
    ProgressingBook,
  },
  computed: {
    books() {      
      return u(this.$store.getters[BOOKS_IN_PROGRESS_GETTER]).orderByDescending(item => item.modifyTime || '0').thenByDescending(item => item.name).toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
  created() {
  }
};
</script>

<style>
</style>