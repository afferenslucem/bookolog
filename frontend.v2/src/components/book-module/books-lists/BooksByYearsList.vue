<template>
  <div class="book-year-list">
    <h4 class="pt-1 header">{{listname | capital}}</h4>

    <ul class="book-list">
      <li v-for="group of booksByYears" :key="group.key">
        <div class="top-year">
          <h5 class="header year-header mt-2 mb-2 d-block">
            {{group.key || $t('book.lists.byYear.yearNotSpecified')}}
          </h5>
          <span class="book-count">
            {{group.group.length}}
          </span>
        </div>
        

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
import DoneBook from "@/components/book-module/book/DoneBook";
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
          (item) => item.endDateYear ? item.endDateYear : null,
          (group) => group.orderByDescending(item => item.endDateYear || 0)
                          .thenByDescending(item => item.endDateMonth || 0)
                          .thenByDescending(item => item.endDateDay || 0)
                          .thenByDescending(item => item.createDate)
                          .toArray()
        )
        .orderByDescending((item) => item.key || Number.MIN_SAFE_INTEGER).toArray();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.top-year {
  display:flex;

  justify-content: space-between;
  align-items: baseline;

  background-color: $bg-color;

  position: sticky;

  top: -1px;
  left: 0;
}
</style>