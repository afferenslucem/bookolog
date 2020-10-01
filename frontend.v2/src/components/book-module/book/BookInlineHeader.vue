<template>
  <div class="header">
    <strong>{{book.name}}</strong>
    <div class="actions">
      <i class="fa fa-cloud-upload fa-xs" v-show="book.shouldSync" aria-hidden="true"></i>
      <i class="fa fa-pencil-square-o" aria-hidden="true" @click="editClick($event)"></i>
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
  methods: {
  }
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