<template>
  <div class="book-header">
    <h4 @click="onHeaderClick()">{{book.name}}</h4>
    <i class="fa fa-cloud-upload fa-lg" v-show="book.shouldSync" aria-hidden="true"></i>
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
  methods: {
  },
};
</script>

<style>
.book-header {
  display: flex;

  align-items: baseline;

  justify-content: space-between;
}
</style>