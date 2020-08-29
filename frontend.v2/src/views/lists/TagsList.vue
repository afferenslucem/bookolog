<template>
  <div class="container pt-1 tags-list">
    <h4 class="mt-1 header">Теги</h4>

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
    <div v-else>Здесь пока ничего нет.</div>
  </div>
</template>

<script>
import { BOOKS_TAGS_COUNT_GETTER } from "@/store/naming";

export default {
  components: {},
  computed: {
    tags() {
      return this.$store.getters[BOOKS_TAGS_COUNT_GETTER];
    },
    shouldShowList() {
      return this.tags != null && this.tags.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>