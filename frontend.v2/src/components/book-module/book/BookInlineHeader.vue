<template>
  <div class="header">
    <strong @click="goToInfo(book.guid)">{{book.name}}</strong>
    <div class="actions">
      <i class="fa fa-cloud-upload fa-xs" v-show="book.shouldSync" aria-hidden="true"></i>
      <i class="fa fa-pencil-square-o" aria-hidden="true" @click="goToEdit(book.guid)"></i>
    </div>
  </div>
</template>

<script>
import bookMixin from "@/mixins/book-entity-mixin";

export default {
  mixins: [bookMixin],
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
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

</style>