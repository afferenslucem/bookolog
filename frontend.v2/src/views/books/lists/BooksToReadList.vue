<template>
  <div class="book-list">
    <h4 class="pt-1 header">{{ $t("book.lists.byStatus.toRead") }}</h4>

    <ul v-if="shouldShowList">
      <li v-for="book of books" class="mb-3" :key="book.guid">
        <to-read-book
          :book="book"
          @bookClick="lineClick(book)"
          @editIconClick="editClick(book, $event)"
        />
      </li>
    </ul>
    <div v-else>{{ $t("book.lists.noOneBook") }}</div>
  </div>
</template>

<script>
import { BOOKS_TO_READ_GETTER } from "@/store/naming";
import bookList from "@/mixins/book-list-mixin.js";
import ToReadBook from "@/components/book/book/ToReadBook";
import _ from "declarray";

export default {
  components: {
    ToReadBook,
  },
  mixins: [bookList],
  computed: {
    books() {
      return _(this.$store.getters[BOOKS_TO_READ_GETTER])
        .orderByDescending((item) => item.modifyDate)
        .thenByDescending((item) => item.createDate)
        .thenByDescending((item) => item.name)
        .toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
};
</script>

<style>
</style>
