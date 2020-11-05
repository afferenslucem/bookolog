<template>
  <div class="book-year-list">
    <div v-if="!shouldShowList">{{ $t("book.lists.noOneBook") }}</div>
    <ul class="book-list" v-else>
      <li v-for="year of booksByYears" :key="year.key" :year="year.key">
        <book-for-year-header @click="swapYearOpening(year)" :year="year" />
        <book-for-year :year="year" :opened="year.opened"></book-for-year>
      </li>
    </ul>
  </div>
</template>

<script>
import BookForYear from "./BookForYearList";
import BookForYearHeader from "./BookForYearListHeader";
import _ from "declarray";
import { Timer } from "essents";

export default {
  components: {
    BookForYear,
    BookForYearHeader,
  },
  data: () => ({
    booksByYears: [],
  }),
  props: {
    books: {
      type: Array,
      required: true,
    },
    showEditButton: {
      default: false,
    },
  },
  methods: {
    swapYearOpening(year) {
      _(this.booksByYears)
        .where((item) => item.key !== year.key)
        .toArray()
        .forEach((item) => {
          item.opened = false;
        });

      year.opened = !year.opened;

      this.$forceUpdate();

      new Timer(() => {
        this.scrollToHeader(year.key);
      }, 0).start();
    },
    scrollToHeader(yearKey) {
      this.$el.querySelector(`[year="${yearKey}"]`).scrollIntoView();
    },
  },
  computed: {
    shouldShowList() {
      return this.books != null && this.books.length > 0;
    },
  },
  created() {
    this.booksByYears = _(this.books)
      .groupBy(
        (item) => item.endDateYear,
        (group) => group.toArray()
      )
      .orderByDescending((item) => item.key || Number.MIN_SAFE_INTEGER)
      .toArray();

    if (this.booksByYears.length > 0) {
      this.booksByYears[0].opened = true;

      this.$forceUpdate();
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables";

.top-year {
  display: flex;

  justify-content: space-between;
  align-items: baseline;

  background-color: $bg-color;

  position: sticky;

  top: -1px;
  left: 0;

  border-bottom: $split-line;
}

.book-count {
  display: inline-block;
  min-width: 2rem;

  text-align: right;
}

.form-inline {
  display: flex;

  > *:not(:last-child) {
    padding-right: 0.25rem;
  }

  .name {
    flex: 1 1 auto;
  }
}
</style>
