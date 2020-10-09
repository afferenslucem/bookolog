<template>
  <div class="header">
    <strong class="text-truncate header-text">{{ book.name }}</strong>
    <div class="actions">
      <should-sync-icon v-if="book.shouldSync"></should-sync-icon>
      <div @click="editClick($event)">
        <edit-icon class="fa-lg"></edit-icon>
      </div>
    </div>
  </div>
</template>

<script>
import bookMixin from "@/mixins/book-entity-mixin";
import EditIcon from "@/components/icons/EditIcon.vue";

export default {
  mixins: [bookMixin],
  components: {
    EditIcon,
  },
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;

  align-items: baseline;

  justify-content: flex-end;

  > i:not(:last-child) {
    margin-right: 0.3rem;
  }
}
.header-text {
  padding-right: .5rem;
}
</style>