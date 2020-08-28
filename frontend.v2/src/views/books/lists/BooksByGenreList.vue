<template>
  <div class="container pt-1 book-year-list">
    <h4 class="mt-1 header">{{name | capital}}</h4>

    <ul v-if="shouldShowList" class="book-list">
      <li v-for="group of booksByYears" :key="group.key">
        <h5 class="header year-header mt-2 mb-2 d-block">{{group.key || 'Год не указан'}}</h5>

        <ul>
          <li
            v-for="(book, key, index) of group.group"
            :class="{'mb-4' : index !== (books.length - 1)}"
            :key="book.guid"
          >
            <done-book :book="book"></done-book>
          </li>
        </ul>
      </li>
    </ul>
    <div v-else>Здесь пока ничего нет.</div>
  </div>
</template>

<script>
import { BOOKS_DONE_GETTER } from "@/store/naming";
import DoneBook from "@/components/book/DoneBook";
import u from "declarray";

export default {
  components: {
    DoneBook,
  },
  data: () => ({
    name: "",
  }),
  computed: {
    books() {
      return u(this.$store.getters[BOOKS_DONE_GETTER])
        .where((item) => !!item.genre)
        .where((item) => item.genre.toLowerCase() == this.name.toLowerCase())
        .sortBy((item) => item.modifyTime || "0")
        .thenBy((item) => item.name)
        .reverse()
        .toArray();
    },
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
    booksByYears() {
      return u(this.books)
        .groupBy(
          (item) => new Date(item.endDate).getFullYear(),
          (group) =>
            group
              .sortBy((item) => item.endDate)
              .thenBy((item) => item.modifyDate)
              .reverse()
              .toArray()
        )
        .sortBy(
          (item) => item.key,
          (a, b) => (b || -1) - (a || -1)
        )
        .toArray();
    },
  },
  created() {
    this.name = this.$route.params.name;
  },
};
</script>

<style>
</style>