<template>
  <div class="book-year-list">
    <h4 class="mt-1 header">{{listname | capital}}</h4>

    <ul class="book-list">
      <li v-for="group of booksByYears" :key="group.key">
        <h5 class="header year-header mt-2 mb-2 d-block">{{group.key || 'Год не указан'}}</h5>

        <ul>
          <li
            v-for="book of group.group"
            class="mb-4"
            :key="book.guid"
          >
            <done-book :book="book"></done-book>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import DoneBook from "@/components/book/DoneBook";
import _ from "declarray";

export default {
  components: {
    DoneBook,
  },
  props: {
      books: {
          type: Array,
          required: true
      },
      listname: {
          type: String,
          required: true
      }
  },
  computed: {
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
    booksByYears() {
      return _(this.books)
        .groupBy(
          (item) => new Date(item.endDate).getFullYear(),
          (group) => group.sortBy(item => item.endDate).thenBy(item => item.modifyDate).reverse().toArray()
        )
        .sortBy((item) => item.key, (a, b) => (b || -1) - (a || -1)).toArray();
    },
  },
};
</script>