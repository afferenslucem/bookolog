<template>
  <div class="book-list">
    <ul v-if="shouldShowList">
      <li v-for="book of books" class="mb-3" :key="book.guid">
        <progressing-book
          :book="book"
          @bookClick="lineClick(book)"
          @editIconClick="editClick(book, $event)"
        ></progressing-book>
      </li>
    </ul>
    <div v-else>{{ $t("book.lists.noOneBook") }}</div>
  </div>
</template>

<script>
import { BOOKS_IN_PROGRESS_GETTER } from "@/store/naming";
import bookList from "@/mixins/book-list-mixin.js";
import ProgressingBook from "@/components/book/book/ProgressingBook";
import u from "declarray";

export default {
  components: {
    ProgressingBook,
  },
  mixins: [bookList],
  computed: {
    books() {
      return u(this.$store.getters[BOOKS_IN_PROGRESS_GETTER])
        .orderByDescending((item) => item.modifyDate)
        .thenByDescending((item) => item.createDate)
        .thenByDescending((item) => item.name)
        .toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
  created() {},
};
</script>
