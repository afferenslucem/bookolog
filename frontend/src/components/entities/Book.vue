<template>
  <div>
      <div class="name">{{book.name}}</div>
      <div class="authors">{{authors}}</div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
       props: {
           book: {
               type: Object,
               required: true
           }
       },
       computed: {
           authors() {
               return this.book.authors.join(', ');
           }
       }
    })
</script>

<style lang="scss" scoped>

</style>