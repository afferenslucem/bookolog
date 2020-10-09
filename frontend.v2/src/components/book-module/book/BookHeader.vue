<template functional>
  <div class="book-header">
    <h4>{{ props.book.name }}</h4>
    <should-sync-icon v-if="props.book.shouldSync"></should-sync-icon>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style>
.book-header {
  display: flex;

  align-items: baseline;

  justify-content: space-between;
}
</style>