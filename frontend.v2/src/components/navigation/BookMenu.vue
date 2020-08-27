<template>
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToInProgress()">Читаю Сейчас</a>
      <a class="icon nav-link" @click="goToAddInProgress()">
        <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToToRead()">Буду читать</a>
      <a class="icon nav-link" @click="goToAddToRead()">
        <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#" @click="goToDone()">Прочитал</a>
      <a class="icon nav-link" @click="goToAddDone()">
        <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</template>

<script>
import sideMenuMixin from "@/mixins/side-menu-mixin";
import { TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS } from "@/models/book";

export default {
  mixins: [sideMenuMixin],
  methods: {
    async goToInProgress() {
      this.$router.push({ name: "InProgress" });
      this.emitClick();
    },
    async goToAddInProgress() {
      this.$router.push({
        name: "CreateBook",
        params: { status: IN_PROGRESS_STATUS },
      });
      this.emitClick();
    },
    async goToToRead() {
      this.$router.push({ name: "ToRead" });
      this.emitClick();
    },
    async goToAddToRead() {
      this.$router.push({
        name: "CreateBook",
        params: { status: TO_READ_STATUS },
      });
      this.emitClick();
    },
    async goToDone() {
      this.$router.push({ name: "Done" });
      this.emitClick();
    },
    async goToAddDone() {
      this.$router.push({
        name: "CreateBook",
        params: { status: DONE_STATUS },
      });
      this.emitClick();
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    margin-right: 0.5rem;
    padding: 0;
  }
}
</style>