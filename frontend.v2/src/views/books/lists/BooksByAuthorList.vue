<template>
  <div class="book-year-list">
    <books-by-years-list
      v-if="shouldShowList"
      :books="books"
      :listname="name | capital"
      showEditButton="true"
      @edit-name="editAuthor($event)"
    >
    </books-by-years-list>
    <div v-else>{{ $t("book.lists.noOneBook") }}</div>
  </div>
</template>

<script>
import { BOOKS_DONE_GETTER, AUTHOR_RENAME_ACTION } from "@/store/naming";
import BooksByYearsList from "@/components/book-module/books-lists/BooksByYearsList";
import _ from "declarray";
import {
  NOTIFICATION_SUCCESS_ACTION,
  NOTIFICATION_DANGER_ACTION,
  NOTIFICATION_WARNING_ACTION,
} from "@/store/naming";
import { NETWORK_ERROR } from "@/http/client";

export default {
  components: {
    BooksByYearsList,
  },
  data: () => ({
    name: "",
    books: [],
  }),
  methods: {
    async editAuthor(newName) {
      try {
        await this.$store.dispatch(AUTHOR_RENAME_ACTION, {
          oldName: this.name,
          newName,
        });

        this.name = newName;

        this.selectBooks();

        this.$store.dispatch(
          NOTIFICATION_SUCCESS_ACTION,
          this.$t("book.lists.author.rename.success")
        );
      } catch (e) {
        if (e == NETWORK_ERROR) {
          this.name = newName;
          this.$store.dispatch(
            NOTIFICATION_WARNING_ACTION,
            this.$t("book.lists.author.rename.offline")
          );
        } else {
          this.$store.dispatch(
            NOTIFICATION_DANGER_ACTION,
            this.$t("book.lists.author.rename.error")
          );
        }
      }
    },
    selectBooks() {
      this.books = _(this.$store.getters[BOOKS_DONE_GETTER])
        .where((item) => item.authors && item.authors.length)
        .where((item) =>
          _(item.authors).any(
            (item) => item.toLowerCase() == this.name.toLowerCase()
          )
        )
        .orderByDescending((item) => +item.modifyDate)
        .thenByDescending((item) => item.name)
        .toArray();
    },
  },
  computed: {
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
  created() {
    this.name = this.$route.params.name;

    this.selectBooks();
  },
};
</script>

<style>
</style>