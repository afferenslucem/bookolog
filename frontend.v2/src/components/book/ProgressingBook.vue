<template>
  <div class="book-line">
    <div class="header">
      <strong @click="goToInfo(book.guid)">{{book.name}}</strong> <i class="fa fa-pencil-square-o" aria-hidden="true" @click="goToEdit(book.guid)"></i>
    </div>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
    <div v-if="book.year">
      <span>Год издания: {{book.year}}</span>
    </div>
    <div v-if="book.genre">
      <span>Жанр: {{book.genre | capital}}</span>
    </div>
    <div v-if="book.startDate">
      Начата: {{startDate}}
    </div>
    <div v-if="book.note">
      <small class="dark-text">{{book.note}}</small>
    </div>
    <progress-bar v-if="shouldShowProgress" :progress="progress" ></progress-bar>
  </div>
</template>

<script>
import bookMixin from '@/mixins/book-entity-mixin';
import ProgressBar from '@/components/book/ProgressBar.vue'; 

export default {
  components: {
    ProgressBar
  },
  mixins:[bookMixin],
  computed: {
    showAuthors() {
      return this.book.authors && (this.book.authors.length > 0)
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  }
};
</script>

<style>
</style>