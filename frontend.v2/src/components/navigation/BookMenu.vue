<template>
  <div class="menu">
    <h5>{{ $t('book.lists.byStatus.title') }}</h5>
    <ul class="nav flex-column">
      <li class="nav-item in-progress">
        <a class="nav-link" href="#" id="inProgressListButton" @click="goToInProgress()">{{ $t('book.lists.byStatus.inProgress') }}</a>
        <a class="icon nav-link" href="#" @click="goToAddInProgress()">
          <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
        </a>
      </li>
      <li class="nav-item to-read">
        <a class="nav-link" href="#" id="toReadListButton" @click="goToToRead()">{{ $t('book.lists.byStatus.toRead') }}</a>
        <a class="icon nav-link" href="#" @click="goToAddToRead()">
          <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
        </a>
      </li>
      <li class="nav-item done">
        <a class="nav-link" href="#" id="toDoneListButton" @click="goToDone()">{{ $t('book.lists.byStatus.done') }}</a>
        <a class="icon nav-link" href="#" @click="goToAddDone()">
          <i class="fa fa-lg fa-plus-square-o" aria-hidden="true"></i>
        </a>
      </li>
    </ul>
  </div>
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