<template>
  <div class="menu">
    <span class="menu__header">{{ $t('book.lists.byStatus.title') }}</span>
    <ul class="menu__body">
      <li class="menu-item in-progress">
        <span id="inProgressListButton" @click="goToInProgress()">{{ $t('book.lists.byStatus.inProgress') }}</span>
        <span class="icon" @click="goToAddInProgress()">
          <plus-icon class="fa-lg"></plus-icon>
        </span>
      </li>
      <li class="menu-item to-read">
        <span id="toReadListButton" @click="goToToRead()">{{ $t('book.lists.byStatus.toRead') }}</span>
        <span class="icon" @click="goToAddToRead()">
          <plus-icon class="fa-lg"></plus-icon>
        </span>
      </li>
      <li class="menu-item done">
        <span id="toDoneListButton" @click="goToDone()">{{ $t('book.lists.byStatus.done') }}</span>
        <span class="icon" @click="goToAddDone()">
          <plus-icon class="fa-lg"></plus-icon>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import sideMenuMixin from "@/mixins/side-menu-mixin";
import { TO_READ_STATUS, IN_PROGRESS_STATUS, DONE_STATUS } from "@/models/book";
import PlusIcon from "@/components/icon/PlusIcon.vue";

export default {
  mixins: [sideMenuMixin],
  components: {
    PlusIcon,
  },
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
