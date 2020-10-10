<template>
  <div class="menu">
    <h5>{{ $t('book.lists.statistic.title') }}</h5>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" id="genresListButton" href="#" @click="goToGenres()">{{ $t('book.lists.statistic.genres') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="tagsListButton" href="#" @click="goToTags()">{{ $t('book.lists.statistic.tags') }}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="authorsListButton" href="#" @click="goToAuthors()">{{ $t('book.lists.statistic.authors') }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import sideMenuMixin from "@/mixins/side-menu-mixin";

export default {
  mixins: [sideMenuMixin],
  methods: {
    async goToGenres() {
      this.$router.push({ name: "Genres" });
      this.emitClick();
    },
    async goToTags() {
      this.$router.push({ name: "Tags" });
      this.emitClick();
    },
    async goToAuthors() {
      this.$router.push({ name: "Authors" });
      this.emitClick();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>