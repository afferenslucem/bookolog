<template>
  <div class="authors-list">
    <h4 class="mt-1 header">{{ $t('book.lists.statistic.authors') }}</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="author of authors"
        class="mb-3"
        :key="author.name"
      >
        <router-link class="name" :to="{name: 'ByAuthor', params: {name: author.name}}"><span>{{author.name | capital}}</span></router-link>
        <span class="count">{{author.count}}</span>
      </li>
    </ul>
    <div v-else>{{ $t('book.lists.noOneBook') }}</div>
  </div>
</template>

<script>
import { BOOKS_DONE_AUTHORS_COUNT_GETTER } from "@/store/naming";

export default {
  components: {},
  computed: {
    authors() {
      return this.$store.getters[BOOKS_DONE_AUTHORS_COUNT_GETTER];
    },
    shouldShowList() {
      return this.authors != null && this.authors.length > 0;
    },
  },
};
</script>