<template>
  <div class="book-year-list">
    <div class="book-year-list__header" v-if="mode == 'show'">
      <h4 class="pt-1 header">{{ listname | capital }}</h4>
      <div @click="turnEditMode()">
        <edit-icon v-if="showEditButton" class="fa-lg" />
      </div>
    </div>
    <div class="book-year-list__header pb-2" v-if="mode == 'edit'">
      <form
        class="form-inline w-100"
        @submit="
          $event.preventDefault();
          return false;
        "
      >
        <div class="form-group name">
          <input class="form-control form-control-sm" v-model="newListName" />
        </div>
        <div class="form-group save">
          <button
            class="btn btn-primary btn-sm"
            @click="
              pushNameIfChanged();
              turnShowMode();
            "
          >
            {{ $t("book.lists.edit.saveButton") }}
          </button>
        </div>
        <div class="form-group decline">
          <button class="btn btn-danger btn-sm" @click="turnShowMode()">
            <cross-icon />
          </button>
        </div>
      </form>
    </div>

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
    mode: "show",
    newListName: "",
  }),
  props: {
    books: {
      type: Array,
      required: true,
    },
    listname: {
      type: String,
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
    turnEditMode() {
      this.newListName = this.listname;
      this.mode = "edit";
    },
    turnShowMode() {
      this.mode = "show";
    },
    pushNameIfChanged() {
      if (this.listname == this.newListName) return;

      this.$emit("edit-name", this.newListName);
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