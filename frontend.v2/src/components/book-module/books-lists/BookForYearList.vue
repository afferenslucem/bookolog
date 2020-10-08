<template>
    <ul v-if="shouldShow">
      <li v-for="book of books" class="mb-4" :key="book.guid">
        <done-book :book="book"></done-book>
      </li>
    </ul>
</template>

<script>
import DoneBook from "@/components/book-module/book/DoneBook";
import _ from "declarray";
export default {
  components: {
    DoneBook,
  },
  data: () => ({
    books: [],
    shouldShow: false,
  }),
  props: {
    year: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    opened(newValue) {
      this.shouldShow = newValue || false;
    }
  },
  created() {
    this.books = _(this.year.group)
      .orderByDescending((item) => item.endDateMonth || 0)
      .thenByDescending((item) => item.endDateDay || 0)
      .thenByDescending((item) => item.modifyDate)
      .toArray();
    
    this.shouldShow = this.opened;
  },
};
</script>
