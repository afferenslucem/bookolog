<template>
  <div class="tags-list">
    <h4 class="mt-1 header">{{ $t('book.lists.statistic.tags') }}</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="tag of tags"
        class="mb-3"
        :key="tag.name"
      >
        <router-link class="name" :to="{name: 'ByTag', params: {name: tag.name}}"><span>{{tag.name | capital}}</span></router-link>
        <span class="count">{{tag.count}}</span>
      </li>
    </ul>
    <div v-else>{{ $t('book.lists.noOneBook') }}</div>
  </div>
</template>

<script>
import { BOOKS_DONE_TAGS_COUNT_GETTER } from "@/store/naming";

export default {
  components: {},
  computed: {
    tags() {
      return this.$store.getters[BOOKS_DONE_TAGS_COUNT_GETTER];
    },
    shouldShowList() {
      return this.tags != null && this.tags.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>