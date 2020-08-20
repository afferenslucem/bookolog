<template>
  <div>
    <div>
      <h6>{{book.name}}</h6>
    </div>
    <div v-if="showAuthors">
      <span>{{book.authors | join}}</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showAuthors() {
      return this.book.authors && (this.book.authors.length > 0)
    }
  },
  props: {
    book: {
      required: true,
      type: Object
    }
  }
};
</script>

<style>
</style>