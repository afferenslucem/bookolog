<template>
  <div class="menu">
    <h5>Статистика</h5>
    <ul class="nav flex-column">
      <li class="nav-item">
        <a class="nav-link" href="#" @click="goToGenres()">Жанры</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Теги</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Авторы</a>
      </li>
    </ul>
  </div>
</template>

<script>
import sideMenuMixin from "@/mixins/side-menu-mixin";
//import { TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS } from "@/models/book";

export default {
  mixins: [sideMenuMixin],
  methods: {
    async goToGenres() {
      this.$router.push({ name: "Genres" });
      this.emitClick();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>