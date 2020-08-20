<template>
  <div>
      <ul v-if="shouldShowList">
        <li v-for="book of books" :key="book.guid">
          <span>{{book.name}}</span>
        </li>
      </ul>
      <div v-else>
        Ты ничего не читаешь
      </div>
  </div>
</template>

<script>
import {BOOKS_IN_PROGRESS_GETTER} from '@/store/naming';

export default {
  computed: {
    books() {
      return this.$store.getters[BOOKS_IN_PROGRESS_GETTER];
    },
    shouldShowList() {
      return (this.books != null) && (this.books.length > 0)
    }
  }
}
</script>

<style>

</style>