<template>
  <div class="book-line">
    <div class="header">
      <strong @click="goToInfo(book.guid)">{{book.name}}</strong>
      <i class="fa fa-pencil-square-o" aria-hidden="true" @click="goToEdit(book.guid)"></i>
    </div>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
    <div class="date-range" v-if="book.startDate || book.endDate">
      [
      <small class="dark-text">{{range}}</small> ]
    </div>
    <div v-if="book.note">
      <small class="dark-text">{{book.note}}</small>
    </div>
  </div>
</template>

<script>
import bookMixin from "@/mixins/book-entity-mixin";

export default {
  mixins: [bookMixin],
  computed: {
    showAuthors() {
      return this.book.authors && this.book.authors.length > 0;
    },
    range() {
      const start = this.book.startDate != null ? this.startDate : "...";
      const end = this.book.endDate != null ? this.endDate : "...";

      return `${start} - ${end}`;
    },
    hasRange() {
      return this.book.startDate && this.book.endDate;
    },
  },
  props: {
    book: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style>
</style>