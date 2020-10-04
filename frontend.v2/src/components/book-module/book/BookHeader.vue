<template>
  <div class="book-header">
    <h4 @click="onHeaderClick()">{{ book.name }}</h4>
    <should-sync-icon v-show="book.shouldSync"></should-sync-icon>
  </div>
</template>

<script>
import ShouldSyncIcon from "@/components/icons/ShouldSyncIcon.vue";
export default {
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
  components: {
    ShouldSyncIcon,
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