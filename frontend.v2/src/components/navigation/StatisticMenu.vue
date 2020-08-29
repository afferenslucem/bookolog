<template>
  <div class="menu">
    <h5>Статистика</h5>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="goToGenres()">Жанры</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="goToTags()">Теги</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click="goToAuthors()">Авторы</a>
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