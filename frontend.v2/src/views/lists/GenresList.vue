<template>
  <div class="container pt-1 genres-list">
    <h4 class="mt-1 header">Жанры</h4>

    <ul v-if="shouldShowList">
      <li
        v-for="genre of genres"
        class="mb-3"
        :key="genre.name"
      >
        <router-link class="name" :to="{name: 'ByGenre', params: {name: genre.name}}"><span>{{genre.name | capital}}</span></router-link>
        <span class="count">{{genre.count}}</span>
      </li>
    </ul>
    <div v-else>Здесь пока ничего нет.</div>
  </div>
</template>

<script>
import { BOOKS_GENRES_COUNT_GETTER } from "@/store/naming";

export default {
  components: {},
  computed: {
    genres() {
      return this.$store.getters[BOOKS_GENRES_COUNT_GETTER];
    },
    shouldShowList() {
      return this.genres != null && this.genres.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>